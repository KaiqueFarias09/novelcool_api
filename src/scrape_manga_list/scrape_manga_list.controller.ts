import { Controller, Get, Query } from '@nestjs/common';
import { ScrapeMangaListService } from './scrape_manga_list.service';

@Controller()
export class ScrapeMangaListController {
  constructor(private scrapeMangaListService: ScrapeMangaListService) {}

  @Get('manga_list')
  async getMangaList(
    @Query('keyw') keyw = '',
    @Query('orby') orby = '',
    @Query('inGenre') inGenre = '',
    @Query('language') language = 'br',
    @Query('page') page = 1,
  ) {
    return this.scrapeMangaListService.scrapeMangaList({
      genre: inGenre,
      language: language,
      keyw: keyw,
      orby: orby,
      page: page,
    });
  }
}
