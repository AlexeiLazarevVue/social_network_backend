import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../user/user.guard";
import {CreatePostDto} from "./post.dto";

@Controller('posts')
export class PostController {
    constructor(
        private postService: PostService
    ) {}
    @Get()
    async getPosts(@Query('limit') limit, @Query('offset') offset) {
        const posts = await this.postService.getPosts(limit, offset)

        return posts
    }

    @UseGuards(AuthGuard)
    @Post()
    async createPost(@Request() request, @Body() createPostDTO: CreatePostDto) {
        const posts = await this.postService.createPost(createPostDTO)

        return posts
    }
}
