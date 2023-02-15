import { NotesService } from './notes/notes.service'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NotesController } from './notes/notes.controller'
import { NotesModule } from './notes/notes.module'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [NotesModule, PrismaModule],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
