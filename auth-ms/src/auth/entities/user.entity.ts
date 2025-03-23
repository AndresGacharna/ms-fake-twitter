import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    email: string;

    @Column('text',{
        select: false
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column({type: 'date'})
    birthday: Date;

    @CreateDateColumn({type:'date'})
    createdAt: Date;

    @Column('bool',{
        default:true
    })
    isActive: boolean;

    @Column('text',{
        array: true,
        default:['user']
    })
    roles: string[];

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.email= this.email.toLocaleLowerCase().trim();
    }
    @BeforeInsert()
    checkFieldsBeforeUpdate(){
        this.checkFieldsBeforeInsert;
    }
}
