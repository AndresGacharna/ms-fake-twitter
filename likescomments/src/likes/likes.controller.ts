import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { UUID } from 'crypto';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  create(@Body() createLikeDto:CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.likesService.findOne(id);
  }

  @Get('count/:id')
  countTweetLikes(@Param('id', ParseUUIDPipe) id: string) {
    return this.likesService.countTweetLikes(id);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.likesService.remove(id);
  }
}
