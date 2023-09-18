import type {PostRepository} from "../repository/postRepository.ts";

export class GetAllPosts {
    constructor(private readonly postRepository: PostRepository) {
    }

    async execute() {
        return await this.postRepository.findAllPosts();
    }
}