import type {PostRepository} from "../repository/postRepository.ts";

export class GetAllPosts {
    constructor(private readonly postRepository: PostRepository) {
    }

    async execute() {
        const allPosts = await this.postRepository.findAllPosts();

        return allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
}