import { Injectable } from "@nestjs/common";
import { Message } from "../../entity/Message";
import {CreateMessageDTO, EditMessageDTO} from "./message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}
  async getMessagesBetweenOf(request, interlocutorId, limit, offset) {
    try {
      const messages = await this.messageRepository.find({
        where: [
          { userId: request.user.id, targetUserId: interlocutorId },
          { userId: interlocutorId, targetUserId: request.user.id },
        ],
        skip: offset,
        take: limit,
      });

      return messages;
    }
    catch (error) {
      console.log(error)
    }
  }
  async createMessage(request, createMessageDTO: CreateMessageDTO) {
    try {
      const message = new Message();

      message.userId = request.user.id;
      message.targetUserId = Number(createMessageDTO.targetUserId);
      message.content = createMessageDTO.content;

      await message.save();

      return message;
    }
    catch (error) {
      console.log(error)
    }
  }

  async editMessage(request, messageId, editMessageDTO: EditMessageDTO) {
    try {
      const message = await Message.findOneBy({id: messageId, userId: request.user.id});

      message.content = editMessageDTO.content;

      await message.save();

      return message;
    }
    catch (error) {
      console.log(error)
    }
  }

  async deleteMessage(request, messageId) {
    try {
      await Message.delete({id: messageId, userId: request.user.id})
    }
    catch (error) {
      console.log(error)
    }
  }
}
