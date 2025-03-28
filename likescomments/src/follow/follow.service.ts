import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follow.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FollowService {
constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>
  ){}

  async create(createFollowDto:CreateFollowDto) {
    try {
      const follow= this.followRepository.create({
        ...createFollowDto,
      });

      await this.followRepository.save(follow);
      return follow;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findOne(id:string) {
    
        let follow: Follow;
    
        follow = await this.followRepository.findOneBy({idFollowed:id})
    
        if (!follow) 
          throw new NotFoundException(`Twitt with id ${id} not found`)
        return follow;
      }

  async countFollowers(id: string): Promise<number> {
    
    const count = await this.followRepository
      .createQueryBuilder('tw')
      .where('tw.id = :id', { id })  // Usamos :id como parámetro seguro
      .getCount();  // Contamos los registros que coinciden
    
    if (count === 0) 
      return 0;
    
    return count;
  }

  async countFollowedPeople(id: string): Promise<number> {
    
    const count = await this.followRepository
      .createQueryBuilder('tw')
      .where('tw.idFollowed = :id', { id })  // Usamos :id como parámetro seguro
      .getCount();  // Contamos los registros que coinciden
    
    if (count === 0) 
      return 0;
    
    return count;
  }
      

  async remove(id: string) {
    const follow= await this.findOne(id);
    await this.followRepository.remove(follow);
  }


  private handleDBErrors(error:any):never{
    if(error.code === '23505')
      throw new BadRequestException(error.detail);

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')
  }
}
