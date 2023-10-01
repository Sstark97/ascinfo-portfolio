import type {PostRepository} from "../repository/postRepository.ts";
import type {Post} from "../../../domain/model/Post.ts";

export class GetAllPosts {
    constructor(private readonly postRepository: PostRepository) {
    }

    async execute() {
        const allPosts = await this.postRepository.findAllPosts();

        return this.getPostsOrderByDateAsc(allPosts);
    }

    private getPostsOrderByDateAsc(allPosts: Post[]) {
        return allPosts.sort((currentPost, nextPost) => (
            nextPost.date.getTime() - currentPost.date.getTime()
        ));
    }
}