import type {PostToRenderDto} from "../dto";
import type {Post} from "../../../domain/model/Post.ts";

export interface PostRepository {
    findAllPosts: () => Promise<Post[]>;
    findPostBySlug: (slug: string) => Promise<PostToRenderDto | undefined>;
}