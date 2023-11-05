import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./apps/user/user.module";
import { FriendsModule } from "./apps/friend/friends.module";
import { MessagesModule } from "./apps/messages/messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostModule } from "./apps/post/post.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite3",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    FriendsModule,
    MessagesModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
