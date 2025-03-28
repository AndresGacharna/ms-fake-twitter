import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity()
@Unique(['idFollowed', 'id']) //Garantiza solo un like por persona
export class Follow {
    @ApiProperty({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "Identificador único del like",
        format: "uuid"
    })
    @PrimaryGeneratedColumn('uuid')
    follow_id: string;

    @ApiProperty({
        example: "2024-02-21T15:30:00Z",
        description: "Fecha y hora en que se creó el comentario",
        type: String
    })
    @CreateDateColumn({ type: 'timestamp', precision: 0 }) // el timestamp es para tiempo más exacto diferente a date
    createdAt: Date;

    
    @ApiProperty({
        description: "id del twitt para poner",
        minLength: 1,
        required: false,
    })
    @Column('text')
    idFollowed: string;
    
    @Column('uuid', {
            nullable: false
    })
    id: string;
}
