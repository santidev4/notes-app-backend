import { Notes, Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}
  // we use prisma client generated types so we don't create unnecesary DTOs
  // TODO fix types
  async createNote(data: any): Promise<Notes> {
    const { categories, ...rest } = data
    const newNote = await this.prisma.notes.create({
      data: {
        ...rest,
        categories: {
          connect: categories.map((e: { id: number }) => {
            return { id: e.id }
          }),
        },
      },
    })
    return newNote
  }

  async deleteNote(id) {
    return await this.prisma.notes.delete({
      where: {
        id,
      },
    })
  }

  async getCurrentNotes() {
    return await this.prisma.notes.findMany({
      where: {
        archived: false,
      },
      include: {
        categories: true,
      },
    })
  }

  async getArchivedNotes() {
    return await this.prisma.notes.findMany({
      where: {
        archived: true,
      },
      include: {
        categories: true,
      },
    })
  }

  async archiveNote(id) {
    return await this.prisma.notes.update({
      where: {
        id,
      },
      data: { archived: true },
    })
  }

  async unarchiveNote(id) {
    return await this.prisma.notes.update({
      where: {
        id,
      },
      data: { archived: false },
    })
  }

  async filterNotesByCategory(categoryName: string) {
    return await this.prisma.notes.findMany({
      where: {
        categories: {
          some: {
            name: categoryName,
          },
        },
      },
      include: {
        categories: true,
      },
    })
  }

  async removeCategoryFromNote(noteID, categoryName) {
    const note = await this.prisma.notes.findFirst({
      where: { id: noteID },
      include: { categories: true },
    })

    const updatedCategories = note.categories
      .filter((category) => category.name !== categoryName)
      .map((category) => {
        return {
          id: category.id,
        }
      })

    return await this.prisma.notes.update({
      where: { id: noteID },
      data: { categories: { set: updatedCategories } },
    })
  }

  async addCategoryToNote(noteID, categoryID) {
    return this.prisma.notes.update({
      where: { id: noteID },
      data: { categories: { set: { id: categoryID } } },
    })
  }
}
