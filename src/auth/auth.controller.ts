import { GoogleUserDto } from './dto/passportUser.dto'
import { AuthService } from './auth.service'
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGuard } from './utils/google-auth.guard'
import { Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(user) {
    console.log('user from controller', user)
    return this.authService.validateUser(user)
  }

  @Get('google-redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return 'ok'
  }

  @Get('status')
  user(@Req() req) {
    if (req.user) {
      return { msg: 'authenticated' }
    } else {
      return { msg: 'not authenticated' }
    }
  }
}
