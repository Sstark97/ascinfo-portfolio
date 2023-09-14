import type {PostRepository} from "../repository/postRepository.ts";

export class GetPost {
    constructor(private readonly postRepository: PostRepository) {
    }

    async execute(slug: string) {
        return await this.postRepository.findPostBySlug(slug);
    }
}