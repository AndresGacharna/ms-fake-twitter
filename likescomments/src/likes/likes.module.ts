import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikeTweet } from './entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports:[
        TypeOrmModule.forFeature([LikeTweet])
      ]
})
export class LikesModule {}
