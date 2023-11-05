import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Friend} from "../../entity/Friend";
import {FriendRequest} from "../../entity/FriendRequest";

@Module({
  imports: [TypeOrmModule.forFeature([Friend, FriendRequest])],
  controllers: [FriendsController],
  providers: [FriendsService]
})
export class FriendsModule {}
