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

    async create(announcementsDTO : AnnouncementsDTO,file:any){
        const ann = new Announcement()
        ann.id = announcementsDTO?.id
        ann.title = announcementsDTO?.title
        ann.description = announcementsDTO?.description
        ann.createDate = announcementsDTO?.createDate
        ann.image = (file) ? file.filename : ''
        const announcement = this.announcementRepository.create(ann)
        await this.announcementRepository.save(ann)
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