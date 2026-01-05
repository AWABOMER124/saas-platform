import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
HEAD
import { PrismaModule } from '../prisma/prisma.module';

import { PrismaModule } from './prisma/prisma.module';
 main

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
