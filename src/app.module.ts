import { PrismaService } from './prisma/prisma.service'
import { NotesService } from './notes/notes.service'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NotesController } from './notes/notes.controller'
import { NotesModule } from './notes/notes.module'
import { PrismaModule } from './prisma/prisma.module'
import { CategoriesModule } from './categories/categories.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    NotesModule,
    PrismaModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService, PrismaService],
})
export class AppModule {}
