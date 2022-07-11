import { Injectable } from '@nestjs/common';

import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';

@Injectable()
export class ScrapeChapterService {
  async scrapeChapter(url: string) {
    try {
      let chapterPage = await axios.get(`${url}-10-1html`);
      let scrappedPage = load(chapterPage.data);

      const data = [];
      let chapterHasPages = true;
      while (chapterHasPages) {
        const nextBtnLink = scrappedPage(
          'div.mangaread-pagenav:nth-child(1) > div:nth-child(6) > a:nth-child(1)',
        ).attr('href');

        scrappedPage('div.pic_box > img').each((i, el) => {
          data.push({
            img: scrappedPage(el).attr('src'),
          });
        });

        chapterHasPages = this.thereIsMorePages(nextBtnLink);
        if (chapterHasPages) {
          chapterPage = await axios.get(nextBtnLink);
          scrappedPage = load(chapterPage.data);
        }
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  private thereIsMorePages(nextBtnLink: string) {
    if (nextBtnLink === '/') {
      return false;
    } else {
      return true;
    }
  }
}
