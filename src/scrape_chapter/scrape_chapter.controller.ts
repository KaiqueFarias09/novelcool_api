import { Controller, Get, Headers } from '@nestjs/common';
import { ScrapeChapterService } from './scrape_chapter.service';

@Controller()
export class ScrapeChapterController {
  constructor(private scrapeChapterService: ScrapeChapterService) {}

  @Get('/read_manga')
  async getChapter(@Headers('url') url: string) {
    return this.scrapeChapterService.scrapeChapter(url);
  }
}
