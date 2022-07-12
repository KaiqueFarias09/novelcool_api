import { Module } from '@nestjs/common';
import { MangaService as MangaService } from './manga.service';
import { MangaController } from './manga.controller';

@Module({
  providers: [MangaService],
  controllers: [MangaController],
})
export class MangaModule {}
