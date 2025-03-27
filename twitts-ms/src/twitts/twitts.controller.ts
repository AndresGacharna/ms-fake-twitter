import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { TwittsService } from './twitts.service';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { UpdateTwittDto } from './dto/update-twitt.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Twitt } from './entities/twitt.entity';

//comentario
@ApiBearerAuth()
@Controller('twitts')
export class TwittsController {
  constructor(private readonly twittsService: TwittsService) {}

  @Post()
  @ApiResponse({status: 201, description:'User Was Created', type: Twitt})
  @ApiResponse({status: 400, description:'Bad Request'})
  @ApiResponse({status: 403, description:'Token related'})
  create(
    @Body() createTwittDto: CreateTwittDto,
  ) {
    return this.twittsService.create(createTwittDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.twittsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.twittsService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateTwittDto: UpdateTwittDto,
  ){
    return this.twittsService.update(id, updateTwittDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.twittsService.remove(id);
  }

}
