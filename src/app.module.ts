import { Module } from '@nestjs/common';
import { ScrapeMangaListModule } from './scrape_manga_list/scrape_manga_list.module';
import { ScrapeMangaInfoModule } from './scrape_manga_info/scrape_manga_info.module';
import { ScrapeChapterModule } from './scrape_chapter/scrape_chapter.module';

@Module({
  imports: [ScrapeMangaListModule, ScrapeMangaInfoModule, ScrapeChapterModule],
})
export class AppModule {}
