import { Body, Controller, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import { RolesGuard } from "../auth/roles.guard";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @Post()
    @UseGuards(RolesGuard)
    createPost(@Body() dto: CreatePostDto) {
        return this.postService.create(dto)
    }


    @Put()
    @UseGuards(RolesGuard)
    update(@Body() body) {
        return this.postService.updatePost(body)
    }
}
