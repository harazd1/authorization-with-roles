import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";


@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post) {}

    async create(dto: CreatePostDto) {
        const post = await this.postRepository.create({...dto})
        return post;
    }

    async updatePost(dto) {
        const post = await this.postRepository.update(dto._id, dto)
        return post;
    }


}
