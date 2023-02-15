import { PrismaService } from '../prisma/prisma.service'
import { Module } from '@nestjs/common'
import { NotesService } from './notes.service'

@Module({
  providers: [NotesService, PrismaService],
})
export class NotesModule {}
