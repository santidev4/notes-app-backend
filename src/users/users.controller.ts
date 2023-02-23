import { UserLoginDto } from './dto/user.dto'
import { Prisma } from '@prisma/client'
import { UsersService } from './users.service'
import { Body, Controller, Post, Request } from '@nestjs/common'

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Post('/signup')
  createNewUser(@Body() data: Prisma.UserCreateInput) {
    return this.users.createUser(data)
  }

  @Post('/login')
  loginUser(@Body() data: UserLoginDto, @Request() req) {
    return this.users.loginUser(data, req)
  }
}
