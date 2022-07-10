import { Module } from '@nestjs/common';
import { ScrapeChapterController } from './scrape_chapter.controller';
import { ScrapeChapterService } from './scrape_chapter.service';

@Module({
  controllers: [ScrapeChapterController],
  providers: [ScrapeChapterService]
})
export class ScrapeChapterModule {}
