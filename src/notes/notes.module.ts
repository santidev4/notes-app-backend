import { NotesController } from './notes.controller'
import { PrismaModule } from './../prisma/prisma.module'
import { PrismaService } from '../prisma/prisma.service'
import { Module } from '@nestjs/common'
import { NotesService } from './notes.service'

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService],
  imports: [PrismaModule],
})
export class NotesModule {}
