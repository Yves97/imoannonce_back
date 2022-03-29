import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Announcement { 
    @PrimaryGeneratedColumn()
    id : number;

    @Column({length : 25})
    title : string;
    
    @Column({length : 200})
    description : string;
}