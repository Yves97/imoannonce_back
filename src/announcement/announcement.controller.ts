import { Body, Controller, Get, Post, Delete,HttpStatus,Param,Patch, UseInterceptors, UploadedFile, BadRequestException, Res } from "@nestjs/common";
import { AnnouncementServices } from "./announcement.service";
import { AnnouncementsDTO } from "./announcements.dto";
import { Express, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
// import {ApiBody,ApiConsumes} from '@nestjs/swagger'
import { Announcement } from "./announcement-entity";


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
    @UseInterceptors(FileInterceptor('image',{
        storage : diskStorage({
            destination : './files',
            filename : (req,file,cb) => {
                const name = file.originalname.split('.')[0]
                const fileExtension = file.originalname.split('.')[1]
                const newFileName = name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension

                cb(null,newFileName)
            },
        }),
        fileFilter : (req,file,cb) => {
            if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
                return cb(null,false)
            }
            cb(null,true)
        }
    }))
    async createAnnouncement(@Body() announcementData : AnnouncementsDTO,@UploadedFile() image : Express.Multer.File){
 
        if(!image){
            return new BadRequestException('Image inexistante')
        }
        const response = {
            imagePath : `http://localhost:3000/announcement/pictures/${image.filename}`
        }
        const announcement = await this.announcementservices.create(announcementData)
        const res = {
            ...announcement,
            response
        }
        return {
            statusCode : HttpStatus.OK,
            message : 'annonce crée avec succès !!',
            res
        }
    }

    @Get('pictures/:filename')
    async getImage(@Param('filename') filename,@Res() res : Response){
        res.sendFile(filename,{root : './files'})
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

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadImage(@UploadedFile() file){
    //     console.log('file==',file)
    // }
}