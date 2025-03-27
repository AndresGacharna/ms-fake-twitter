import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Commentaries } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Commentaries)
    private readonly commentRepository: Repository<Commentaries>,
  ){}
  async create(createCommentDto: CreateCommentDto) {

    try {
      const comment = this.commentRepository.create({
        ...createCommentDto,
      });
      await this.commentRepository.save(comment);
      return comment;
    
    } catch (error) {
      throw new InternalServerErrorException('Error en la creacion de comentario')
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;

    return this.commentRepository.find({
      take: limit,
      skip: offset
    })

  }

  async findPublicationComments(id: string, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
  
    return this.commentRepository.find({
      where: { idTwitt: id }, // Filtra los comentarios donde idTwitt sea igual al id recibido
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' } // Opcional: ordenar por fecha de creación descendente
    });
  }

  async findOne(term:string) {
  
      let comment: Commentaries;
  
      if(isUUID(term)){
        comment = await this.commentRepository.findOneBy({comment_id:term})
      } else{
        const queryBuilder = this.commentRepository.createQueryBuilder('tw');
        comment = await queryBuilder
        .where(`content ILIKE :term`,{
          term: `%${term}%`
        }).getOne();
      }
  
      if (!comment) 
        throw new NotFoundException(`Twitt with id ${term} not found`)
      return comment;
    }
  
  async update(id: string, updateCommentDto: UpdateCommentDto) {

    const currentTimestamp: Date = new Date();
    const offset = 5; // Diferencia de +5 horas entre el sistema y PostgreSQL
    currentTimestamp.setHours(currentTimestamp.getHours() + offset);

    const comment = await this.commentRepository.preload({
      comment_id: id,
      EditedAt: currentTimestamp,
      ...updateCommentDto
    });

    if(!comment) throw new NotFoundException(`Twitt with id ${id} not found`);
    try {
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('dominó2')
    }
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);

  }
}
