import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {AnnouncementServices} from './announcement.service'
import {AnnouncementController} from './announcement.controller'
import { Announcement } from './announcement-entity'

@Module({
    imports : [TypeOrmModule.forFeature([Announcement])],
    providers : [AnnouncementServices],
    controllers : [AnnouncementController]
})
export class AnnouncementModule{}
