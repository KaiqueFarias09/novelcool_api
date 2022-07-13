import { Injectable } from '@nestjs/common';

import { CheerioAPI, load } from 'cheerio';
import axios from 'axios';

@Injectable()
export class ChapterService {
  async scrapeChapter(url: string) {
    try {
      let chapterPage = await axios.get(`${url}-10-1.html`);
      let scrappedPage = load(chapterPage.data);

      const data = [];
      scrappedPage('div.pic_box > img').each((_, el) => {
        data.push({
          img: scrappedPage(el).attr('src'),
        });
      });

      const chapterPagesLinks = this.createArrayOfLinks({
        firstChapterPage: scrappedPage,
        firstChapterLink: url,
      });
      const otherPages = await axios
        .all(chapterPagesLinks.map((link) => axios.get(link)))
        .then((data) => data);

      for (let i = 0; i < otherPages.length; i++) {
        const newScrappedPage = load(otherPages[i].data);
        newScrappedPage('div.pic_box > img').each((_, el) => {
          data.push({
            img: newScrappedPage(el).attr('src'),
          });
        });
      }

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  private createArrayOfLinks({
    firstChapterPage,
    firstChapterLink,
  }: {
    firstChapterPage: CheerioAPI;
    firstChapterLink: string;
  }) {
    const numberOfLinks = Number(
      firstChapterPage(
        'div.mangaread-pagenav:nth-child(1) > select:nth-child(5)',
      ).text()[3],
    );

    const links = [];
    for (let i = 2; i <= numberOfLinks; i++) {
      links.push(`${firstChapterLink}-10-${i}.html`);
    }
    return links;
  }
}
