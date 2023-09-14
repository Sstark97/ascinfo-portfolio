import type {PostRepository} from "../../application/post/repository/postRepository.ts";
import type {Post} from "../../domain/model/Post.ts";
import {getCollection} from "astro:content";

export class PostAstroContentAdapter implements PostRepository {
    async findAllPosts(): Promise<Post[]> {
        const postsCollection = await getCollection("posts");
        return postsCollection.map((post) => {
            const  { title, description, image, canonical_url, date, tags} = post.data;
            return {
                slug: post.slug,
                title,
                description,
                image,
                canonical_url,
                date,
                tags,
            };
        });
    }
}