import { Controller, Get, Headers } from '@nestjs/common';
import { ScrapeMangaInfoService } from './scrape_manga_info.service';

@Controller()
export class ScrapeMangaInfoController {
  constructor(private scrapeMangaInfoService: ScrapeMangaInfoService) {}

  @Get('manga_info')
  async getMangaInfo(@Headers('url') url: string) {
    return this.scrapeMangaInfoService.scrapeMangaInfo(url);
  }
}
