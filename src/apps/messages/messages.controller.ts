import {Controller, Get, Param, Request, Query, UseGuards, Post, Put, Body, Delete} from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {AuthGuard} from "../user/user.guard";
import {CreateMessageDTO, EditMessageDTO} from "./message.dto";

@Controller('/messages')
export class MessagesController {
    constructor(
        private messagesService: MessagesService
    ) {}

    @UseGuards(AuthGuard)
    @Get('/:interlocutorId')
    async getMessagesBetweenOf(@Request() request, @Param('interlocutorId') interlocutorId, @Query('limit') limit, @Query('offset') offset) {
        const messages = await this.messagesService.getMessagesBetweenOf(request, interlocutorId, limit, offset)

        return messages
    }

    @UseGuards(AuthGuard)
    @Post()
    async createMessage(@Request() request, @Body() createMessageDTO: CreateMessageDTO) {
        const message = await this.messagesService.createMessage(request, createMessageDTO)

        return message
    }

    @UseGuards(AuthGuard)
    @Put('/:messageId')
    async editMessage(@Request() request, @Param('messageId') messageId, @Body() editMessageDTO: EditMessageDTO) {
        const message = await this.messagesService.editMessage(request, messageId, editMessageDTO)

        return message
    }


    @UseGuards(AuthGuard)
    @Delete('/:messageId')
    async deleteMessage(@Request() request, @Param('messageId') messageId) {
        const messages = await this.messagesService.deleteMessage(request, messageId)

        return messages
    }
}
