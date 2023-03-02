import { PrismaService } from 'src/prisma/prisma.service'
import { GoogleStrategy } from './utils/google.strategy'
import { Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { SessionSerialzer } from './utils/Serializer'

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    GoogleStrategy,
    PrismaService,
    SessionSerialzer,
    AuthController,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
