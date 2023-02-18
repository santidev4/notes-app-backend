import { Prisma } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  constructor(private categories: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categories.getCategories()
  }

  @Post()
  createCategory(@Body() data: Prisma.CategoriesCreateInput) {
    return this.categories.createCategory(data)
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: Prisma.CategoriesDeleteArgs) {
    return this.categories.deleteCategory(id)
  }
}
