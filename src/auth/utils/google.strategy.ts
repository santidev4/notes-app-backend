import { AuthController } from './../auth.controller'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Req } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { Request } from 'express'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authController: AuthController) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    })
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    const { emails, displayName } = profile
    const userData = {
      email: emails[0].value,
      name: displayName,
    }
    return await this.authController.handleLogin(userData)
    // const user = {
    //   email: emails[0].value,
    //   displayName,
    //   accessToken,
    //   refreshToken,
    // }
    // done(null, user)
  }
}
