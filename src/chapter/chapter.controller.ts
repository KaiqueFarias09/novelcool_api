import { Controller, Get, Headers } from '@nestjs/common';
import { ChapterService } from './chapter.service';

@Controller()
export class ChapterController {
  constructor(private scrapeChapterService: ChapterService) {}

  @Get('/read_manga')
  async getChapter(@Headers('url') url: string) {
    return this.scrapeChapterService.scrapeChapter(url);
  }
}
