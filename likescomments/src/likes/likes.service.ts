import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {LikeTweet } from './entities/like.entity';
import { Repository } from 'typeorm';


@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeTweet)
    private readonly likeTweetRepository: Repository<LikeTweet>
  ){}

  async create(createLikeDto:CreateLikeDto) {
    try {
      const like= this.likeTweetRepository.create({
        ...createLikeDto,
      });

      await this.likeTweetRepository.save(like);
      return like;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findOne(id:string) {
    
        let like: LikeTweet;
    
        like = await this.likeTweetRepository.findOneBy({idTwitt:id})
    
        if (!like) 
          throw new NotFoundException(`Twitt with id ${id} not found`)
        return like;
      }

  async countTweetLikes(id: string): Promise<number> {
    
    const count = await this.likeTweetRepository
      .createQueryBuilder('tw')
      .where('tw.idTwitt = :id', { id })  // Usamos :id como parámetro seguro
      .getCount();  // Contamos los registros que coinciden
    
    if (count === 0) 
      return 0;
    
    return count;
  }
      

  async remove(id: string) {
    const like= await this.findOne(id);
    await this.likeTweetRepository.remove(like);
  }


  private handleDBErrors(error:any):never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
