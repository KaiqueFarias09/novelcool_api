import { Injectable } from '@nestjs/common';

import { AnyNode, Cheerio, load } from 'cheerio';
import axios from 'axios';

type validateDataType = {
  type: string;
  mangaName: string;
  mangaViews: number;
};
@Injectable()
export class ScrapeMangaListService {
  async scrapeMangaList({
    genre,
    language,
    orby,
    keyw,
    page,
  }: {
    genre: string;
    language: string;
    orby: string;
    keyw: string;
    page: number;
  }) {
    if (orby === 'latestUpdates') {
      return await this.scrapeRecentMangas({
        genre: genre,
        language: language,
      });
    } else {
      const data = await this.scrapeAdvancedSearch({
        genre: genre,
        language: language,
        orby: orby,
        keyw: keyw,
        page: page,
      });
      return data;
    }
  }

  private async scrapeRecentMangas({
    genre,
    language,
  }: {
    genre: string;
    language: string;
  }) {
    try {
      const page = await axios.get(
        `https://${language}.novelcool.com/category/latest/category_id-${genre}.html`,
      );
      const scrappedPage = load(page.data);

      const data = [];
      scrappedPage('div.book-item').each((i, el) => {
        const manga = scrappedPage(el);
        const type = manga
          .find('div:nth-child(1) > a:nth-child(1) > div:nth-child(2)')
          .text();

        if (type !== 'Novel') {
          data.push({
            index: i,
            title: manga
              .find('div:nth-child(4) > a:nth-child(1) > div:nth-child(1)')
              .text()
              .trim(),
            img: manga
              .find('div:nth-child(1) > a:nth-child(1) > img:nth-child(1)')
              .attr('lazy_url'),
            src: manga.find('div:nth-child(1) > a:nth-child(1)').attr('href'),
          });
        }
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  private async scrapeAdvancedSearch({
    language,
    page,
    genre,
    orby,
    keyw,
  }: {
    language: string;
    page: number;
    genre: string;
    orby: string;
    keyw: string;
  }) {
    try {
      // I made this changes to the keyw because they can impact the search results, that's the way that I can produce the most results for search
      keyw = keyw.charAt(0).toUpperCase() + keyw.slice(1).toLowerCase();
      const advancedSearchPage = await axios.get(
        `https://${language}.novelcool.com/search/?name_sel=contain&name=${keyw}&author_sel=contain&author=&category_id=${genre}&out_category_id=&publish_year=&completed_series=${orby}&rate_star=&page=${page}`,
      );
      const scrappedPage = load(advancedSearchPage.data);

      const data = [];
      scrappedPage('div.book-item').each((i, el) => {
        const manga = scrappedPage(el);
        const validationInfo = this.createValidateInfo(manga);

        if (this.isValidManga(validationInfo)) {
          data.push({
            index: i,
            title: manga
              .find('div:nth-child(4) > a:nth-child(1) > div:nth-child(1)')
              .text()
              .trim(),
            img: manga
              .find('div:nth-child(1) > a:nth-child(1) > img:nth-child(1)')
              .attr('src'),
            src: manga.find('div:nth-child(1) > a:nth-child(1)').attr('href'),
          });
        }
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  private isValidManga(validateData: validateDataType) {
    if (
      !validateData.mangaName.toLowerCase().includes('novel') &&
      validateData.mangaViews > 1
    ) {
      return true;
    }
  }

  private createValidateInfo(manga: Cheerio<AnyNode>) {
    const type = manga
      .find('div:nth-child(1) > a:nth-child(1) > div:nth-child(2)')
      .text();
    const mangaName = manga
      .find('div:nth-child(4) > a:nth-child(1) > div:nth-child(1)')
      .text()
      .trim();
    const mangaViews = Number(
      manga
        .find(
          'div:nth-child(4) > a:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(2)',
        )
        .text()
        .replace(',', '.'),
    );

    const validationInfo: validateDataType = {
      type: type,
      mangaName: mangaName,
      mangaViews: mangaViews,
    };
    return validationInfo;
  }
}
