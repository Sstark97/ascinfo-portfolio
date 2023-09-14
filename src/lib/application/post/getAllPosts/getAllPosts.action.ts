import type {PostRepository} from "../repository/postRepository.ts";

export class GetAllPost {
    constructor(private readonly postRepository: PostRepository) {
    }

    async execute() {
        return await this.postRepository.findAllPosts();
    }
}