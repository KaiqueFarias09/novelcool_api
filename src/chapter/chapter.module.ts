import { Module } from '@nestjs/common';
import { ChapterController } from './chapter.controller';
import { ChapterService as ChapterService } from './chapter.service';

@Module({
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
