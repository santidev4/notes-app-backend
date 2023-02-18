import { Categories, Prisma } from '@prisma/client'
import { PrismaService } from './../prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    data: Prisma.CategoriesCreateInput,
  ): Promise<Categories> {
    const newCategory = await this.prisma.categories.create({
      data,
    })
    return newCategory
  }

  async getCategories() {
    return await this.prisma.categories.findMany()
  }

  async deleteCategory(id) {
    return await this.prisma.categories.delete({
      where: {
        id,
      },
    })
  }
}
