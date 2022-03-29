import { Injectable,Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Announcement} from "./announcement-entity"


@Injectable()
export class AnnouncementServices {
    constructor(@InjectRepository(Announcement) private announcementRepository: Repository<Announcement>){ }
    
    findAll(): Promise<Announcement[]>{
        return this.announcementRepository.find()
    }

    findOne(id:string):Promise<Announcement>{
        return this.announcementRepository.findOne(id)
    }

    async remove(id:string):Promise<void>{
        await this.announcementRepository.delete(id)
    }
}