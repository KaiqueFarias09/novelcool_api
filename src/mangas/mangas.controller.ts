import { Controller, Get, Query } from '@nestjs/common';
import { MangasService } from './mangas.service';

@Controller()
export class MangasController {
  constructor(private scrapeMangaListService: MangasService) {}

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
