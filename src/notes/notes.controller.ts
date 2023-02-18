import { NotesService } from './notes.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Get('current')
  getCurrenNotes() {
    return this.notesService.getCurrentNotes()
  }

  @Get('archives')
  getArchivedNotes() {
    return this.notesService.getArchivedNotes()
  }

  @Get('filter')
  filterNotesByCategory(@Query() query) {
    return this.notesService.filterNotesByCategory(query.category)
  }

  @Post('create')
  createNote(@Body() data: Prisma.NotesCreateInput) {
    return this.notesService.createNote(data)
  }

  @Patch('archive/:id')
  archiveNote(@Param('id') id: string) {
    return this.notesService.archiveNote(id)
  }

  @Patch('unarchive/:id')
  unarchiveNote(@Param('id') id: string) {
    return this.notesService.unarchiveNote(id)
  }

  @Patch('remove')
  removeCategoryFromNote(@Query() query) {
    return this.notesService.removeCategoryFromNote(query.note, query.category)
  }

  @Patch('add')
  addCategoryToNote(@Query() query) {
    return this.notesService.addCategoryToNote(query.note, query.category)
  }

  @Delete(':id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.deleteNote(id)
  }
}
