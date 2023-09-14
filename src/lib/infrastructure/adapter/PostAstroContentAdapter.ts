import type {PostRepository} from "../../application/post/repository/postRepository.ts";
import {getCollection, getEntry} from "astro:content";

export class PostAstroContentAdapter implements PostRepository {
    async findAllPosts(){
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

    async findPostBySlug(slug: string){
        const postEntry = await getEntry("posts", slug);
        if (postEntry) {
            const { title, description, image, canonical_url, date, tags} = postEntry.data;
            return {
                slug: postEntry.slug,
                title,
                description,
                image,
                canonical_url,
                date,
                tags,
                render: postEntry.render,
            };
        }
    }
}