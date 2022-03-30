import { Injectable,Inject, UploadedFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Announcement} from "./announcement-entity"
import { AnnouncementsDTO } from "./announcements.dto";


@Injectable()
export class AnnouncementServices {
    constructor(@InjectRepository(Announcement) private announcementRepository: Repository<Announcement>){ }
    
    findAll(): Promise<Announcement[]>{
        return this.announcementRepository.find()
    }

    async create(data : AnnouncementsDTO){
        const announcement = this.announcementRepository.create(data)
        await this.announcementRepository.save(data)
        return announcement;
    }

    findOne(id:string):Promise<Announcement>{
        return this.announcementRepository.findOne(id)
    }

    async remove(id:string):Promise<void>{
        await this.announcementRepository.delete(id)
    }

    async update(id:number,data : Announcement){
        await this.announcementRepository.update({id},data)
        return await this.announcementRepository.findOne({id})
    }
}