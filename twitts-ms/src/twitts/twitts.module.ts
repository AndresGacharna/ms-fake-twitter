import { Module } from '@nestjs/common';
import { TwittsService } from './twitts.service';
import { TwittsController } from './twitts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twitt } from './entities/twitt.entity';

@Module({
  controllers: [TwittsController],
  providers: [TwittsService],
  imports:[
    TypeOrmModule.forFeature([Twitt]),
  ]
})
export class TwittsModule {}
