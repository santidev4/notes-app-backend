import { GoogleUserDto } from './dto/passportUser.dto'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(userData): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    })
    console.log('auth.service---> userData', userData)
    if (user) return user
    const googleUser = await this.prisma.user.create({
      data: userData,
    })
    console.log('auth.service---> googleUser', googleUser)
    return googleUser
  }

  async findUser(payload) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    })
    return user
  }
}
