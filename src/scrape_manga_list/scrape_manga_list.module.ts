import { Module } from '@nestjs/common';
import { ScrapeMangaListController } from './scrape_manga_list.controller';
import { ScrapeMangaListService } from './scrape_manga_list.service';

@Module({
  controllers: [ScrapeMangaListController],
  providers: [ScrapeMangaListService],
})
export class ScrapeMangaListModule {}
