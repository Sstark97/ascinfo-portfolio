import type {Post} from "../../../domain/model/Post";

export interface PostRepository {
    getAllPosts: () => Promise<Post[]>;
}