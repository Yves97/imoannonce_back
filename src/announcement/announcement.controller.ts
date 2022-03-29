import { Body, Controller, Get, Post } from "@nestjs/common";
import { AnnouncementServices } from "./announcement.service";

@Controller('announcement')
export class AnnouncementController {
    constructor(private announcementservices : AnnouncementServices){}

    @Get()
    getAnnouncement(){
        return 'liste des annonces';
    }


    // @Post(@Body announcement)
}