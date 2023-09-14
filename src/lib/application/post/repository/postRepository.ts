import type {Post} from "../../../domain/model/Post";

export interface PostRepository {
    findAllPosts: () => Promise<Post[]>;
    findPostBySlug: (slug: string) => Promise<Post | undefined>;
}