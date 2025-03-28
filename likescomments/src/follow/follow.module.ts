import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { Follow } from './entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
    imports:[
            TypeOrmModule.forFeature([Follow])
          ]
})
export class FollowModule {}
