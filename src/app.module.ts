import { Module } from '@nestjs/common';
import { MangasModule } from './mangas/mangas.module';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MangasModule, MangaModule, ChapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
