import { Notes, Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  // we use prisma client generated types so we don't create unnecesary DTOs
  async createNote(data: Prisma.NotesCreateInput): Promise<Notes> {
    return this.prisma.notes.create({
      data,
    })
  }
}
