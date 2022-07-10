import { Module } from '@nestjs/common';
import { ScrapeMangaInfoService } from './scrape_manga_info.service';
import { ScrapeMangaInfoController } from './scrape_manga_info.controller';

@Module({
  providers: [ScrapeMangaInfoService],
  controllers: [ScrapeMangaInfoController]
})
export class ScrapeMangaInfoModule {}
