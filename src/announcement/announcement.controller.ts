import { Body, Controller, Get, Post, Delete,HttpStatus,Param,Patch } from "@nestjs/common";
import { AnnouncementServices } from "./announcement.service";
import { AnnouncementsDTO } from "./announcements.dto";

@Controller('announcement')
export class AnnouncementController {
    constructor(private announcementservices : AnnouncementServices){}

    @Get()
    async getAnnouncements(){
        const announcements = await this.announcementservices.findAll()
        return {
            statusCode : HttpStatus.OK,
            message : 'Liste des annonces',
            announcements
        }
    }

    @Post()
    async createAnnouncement(@Body() announcementData : AnnouncementsDTO){
        const announcement = await this.announcementservices.create(announcementData)
        return {
            statusCode : HttpStatus.OK,
            message : 'annonce crée avec succès !!',
            announcement
        }
    }

    @Get(':id')
    async readAnnouncement(@Param('id') id: string){
        const data = await this.announcementservices.findOne(id)
        return {
            statusCode : HttpStatus.OK,
            message : 'Utilisateur trouvé avec success',
            data
        }
    }

    @Patch(':id')
    async updateAnnouncement(@Param('id') id : number,@Body() data : AnnouncementsDTO){
        await this.announcementservices.update(id,data)
        return {
            statusCode : HttpStatus.OK,
            message : 'Annonce supprimé avec success'
        }
    }

    @Delete(":id")
    async deleteAnnouncement(@Param('id') id: string){
        await this.announcementservices.remove(id)
        return {
            statusCode : HttpStatus.OK,
            message : 'Annonce supprimée'
        }
    }
}