import { Injectable } from '@nestjs/common';
import {Post} from "../../entity/Post";

@Injectable()
export class PostService {
    async getPosts(limit: number, offset: number) {
        try {
            const posts = await Post.find({
                take: limit,
                skip: offset
            })

            return posts
        }
        catch (error) {
            console.log(error)
        }
    }
}
