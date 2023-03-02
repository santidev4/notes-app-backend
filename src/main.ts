import { PrismaClient } from '@prisma/client'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(
    session({
      cookie: {
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        sameSite: process.env.ENV === 'production' ? 'strict' : 'lax',
        secure: process.env.ENV === 'production',
      },
      secret: 'a santa at nasa',
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(3000)
}
bootstrap()
