import { Module } from '@nestjs/common';
import { RetweetsService } from './retweets.service';
import { RetweetsController } from './retweets.controller';
import { Retweet } from './entities/retweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [RetweetsController],
  providers: [RetweetsService],
  imports:[
          TypeOrmModule.forFeature([Retweet])
        ]
})
export class RetweetsModule {}
