import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm';

@Entity()
export class Announcement { 

    @CreateDateColumn()
    createDate : Date;

    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 25})
    title : string;
    
    @Column({length : 200})
    description : string;

    @Column({length : 200,nullable : true})
    image : string;

}