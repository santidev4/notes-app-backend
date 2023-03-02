import { User } from '@prisma/client'
import { AuthService } from './../auth.service'
import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerialzer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super()
  }

  serializeUser(user: User, done: Function) {
    console.log('serialize', user)
    done(null, user)
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload)
    console.log('user deserialze', user)
    return user ? done(null, user) : done(null, null)
  }
}
