import { Module } from '@nestjs/common';
import { MangasModule } from './mangas/mangas.module';
import { MangaModule } from './manga/manga.module';
import { ChapterModule } from './chapter/chapter.module';

@Module({
  imports: [MangasModule, MangaModule, ChapterModule],
})
export class AppModule {}
