import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Commentaries } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsService } from './comment.service';
//comentario
@ApiBearerAuth()
@Controller('commentaries')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({status: 201, description:'User Was Created', type: Commentaries})
  @ApiResponse({status: 400, description:'Bad Request'})
  @ApiResponse({status: 403, description:'Token related'})
  create(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.commentsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.commentsService.findOne(term);
  }

  @Get('publication/:id')
  findPublicationComments(
    @Query() paginationDto: PaginationDto,
    @Param('id') id: string
  ){
    return this.commentsService.findPublicationComments(id, paginationDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCommentDto: UpdateCommentDto,
  ){
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.remove(id);
  }

  
}
