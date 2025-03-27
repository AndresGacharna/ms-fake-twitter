import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateRetweetDto } from './dto/create-retweet.dto';
import { RetweetsService } from './retweets.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('retweets')
export class RetweetsController {
  constructor(private readonly retweetService: RetweetsService) {}

  @Post()
  create(@Body() createRetweetDto:CreateRetweetDto) {
    return this.retweetService.create(createRetweetDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.retweetService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.retweetService.findOne(id);
  }

  @Get('count/:id')
  countTweetLikes(@Param('id', ParseUUIDPipe) id: string) {
    return this.retweetService.countRetweets(id);
  }

  @Get('alluserretweets/:id')
  findUserRetweets(
    @Query() paginationDto: PaginationDto,
    @Param('id') id: string
  ){
    return this.retweetService.findUserRetweets(id, paginationDto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.retweetService.remove(id);
  }
}
