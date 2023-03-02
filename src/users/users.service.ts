import { UserLoginDto } from './dto/user.dto'
import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon2 from 'argon2'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    // TODO add sessionID?
    try {
      const { password, ...rest } = data
      const hashedPassword = await argon2.hash(password)
      const newUser = await this.prisma.user.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      })
      return newUser
    } catch (error) {
      console.error(error)
    }
  }

  async loginUser(data: UserLoginDto, req) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email: data.email },
      })
      const passwordCorrect =
        user === null
          ? false
          : await argon2.verify(user.password, data.password)
      if (passwordCorrect)
        await this.prisma.user.update({
          where: { id: user.id },
          data: { sessionId: req.sessionID },
        })
      return req.session
    } catch (error) {
      console.error(error)
    }
  }
}
