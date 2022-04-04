import { Body, Controller, Get, Post, Delete,HttpStatus,Param,Patch, UseInterceptors, UploadedFile, BadRequestException, Res } from "@nestjs/common";
import { AnnouncementServices } from "./announcement.service";
import { AnnouncementsDTO } from "./announcements.dto";
import { Express, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {ApiBody,ApiConsumes} from '@nestjs/swagger'

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

    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: AnnouncementsDTO })
    async createAnnouncement(@Body() announcementData : AnnouncementsDTO,@UploadedFile() image : Express.Multer.File){
        if(!image){
            return new BadRequestException('Image inexistante')
        }
        const announcement = await this.announcementservices.create(announcementData,image)
        return {
            statusCode : HttpStatus.OK,
            message : 'annonce crée avec succès !!',
            announcement
        }
    }

    @Get('pictures/:filename')
    async getImage(@Param('filename') filename,@Res() res : Response){
        res.sendFile(filename,{root : './files'})
    }

    @Get(':id')
    async readAnnouncement(@Param('id') id: string){
        try{
            const data = await this.announcementservices.findOne(id)
            if(!data){
                return {
                    statusCode : HttpStatus.NOT_FOUND,
                    message : 'Utilisateur non trouvé'   
                }
            }
            return {
                statusCode : HttpStatus.OK,
                message : 'Utilisateur trouvé avec success',
                data
            }
        }catch(e){
            return {
                statusCode : HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    @Patch(':id')
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
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: AnnouncementsDTO })
    async updateAnnouncement(@Param('id') id : number,@Body() data : AnnouncementsDTO,@UploadedFile() image : Express.Multer.File){
        await this.announcementservices.update(id,data,image)
        return {
            statusCode : HttpStatus.OK,
            message : 'Annonce modifiée avec success'
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