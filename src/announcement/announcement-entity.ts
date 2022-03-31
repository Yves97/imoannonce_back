import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Announcement { 

    @CreateDateColumn()
    createDate : Date;
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar',length : 25,nullable : true})
    title : string;
    
    @Column({type : 'varchar',length : 200,nullable : true})
    description : string;

    @Column({type : 'varchar',length : 200,nullable : true})
    image : string;

}