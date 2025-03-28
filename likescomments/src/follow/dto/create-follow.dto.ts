import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateFollowDto {

    
    @ApiProperty({
        description: 'Here is the Twitt ID',
    })
    
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    idFollowed: string;

    @ApiProperty({
        description: 'Here is going to be the name of the user',
    })
    @IsNotEmpty()
    @IsUUID()
    id:string;

    
}
