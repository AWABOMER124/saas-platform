import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ tenantName, email, password }: RegisterDto) {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    const { tenant, user } = await this.prisma.$transaction(async (tx) => {
      const createdTenant = await tx.tenant.create({
        data: { name: tenantName },
      });

      const createdUser = await tx.user.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword,
          role: 'OWNER',
          tenantId: createdTenant.id,
        },
      });

      return { tenant: createdTenant, user: createdUser };
    });

    const payload = { sub: user.id, tenantId: user.tenantId, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      tenant: { id: tenant.id, name: tenant.name },
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
      access_token,
    };
  }

  async login({ email, password }: LoginDto) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { tenant: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, tenantId: user.tenantId, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      tenant: { id: user.tenant.id, name: user.tenant.name },
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      },
      access_token,
    };
  }
}
