import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commentaries } from './entities/comment.entity';
import { CommentsController } from './comment.controller';
import { CommentsService } from './comment.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports:[
      TypeOrmModule.forFeature([Commentaries]),
    ]
})
export class CommentsModule {}
