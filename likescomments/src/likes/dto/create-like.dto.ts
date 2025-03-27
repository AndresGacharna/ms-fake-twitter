import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";

export class CreateLikeDto {

    
    @ApiProperty({
        description: 'Here is the Twitt ID',
    })
    
    @IsUUID()
    @IsNotEmpty()
    @IsString()
    idTwitt: string;

    @ApiProperty({
        description: 'Here is going to be the name of the user',
    })
    @IsNotEmpty()
    @IsUUID()
    id:string;

    
}

