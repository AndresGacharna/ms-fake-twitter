import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
    create(@Body() createFollowDto:CreateFollowDto) {
      return this.followService.create(createFollowDto);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.followService.findOne(id);
    }
  
    @Get('countfollowers/:id')
    countFollowers(@Param('id', ParseUUIDPipe) id: string) {
      return this.followService.countFollowers(id);
    }

    @Get('countfollowed/:id')
    countFollowedPeople(@Param('id', ParseUUIDPipe) id: string) {
      return this.followService.countFollowedPeople(id);
    }
    
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
      return this.followService.remove(id);
    }
}
