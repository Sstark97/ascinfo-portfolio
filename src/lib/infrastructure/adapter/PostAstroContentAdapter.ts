import type {PostRepository} from "@application/post/repository/postRepository.ts";
import {getCollection, getEntry} from "astro:content";
import type {Post} from "@domain/model/Post.ts";

export class PostAstroContentAdapter implements PostRepository {
    async findAllPosts(){
        const postsCollection = await getCollection("posts");
        const allPosts: Post[] = postsCollection.map((post) => {
            const  { title, description, image, canonical_url, date, isPublished, tags} = post.data;
            return {
                slug: post.slug,
                title,
                description,
                image,
                canonical_url,
                date,
                isPublished,
                tags,
            };
        });

        return allPosts.filter((post) => post.isPublished);
    }

    async findPostBySlug(slug: string){
        const postEntry = await getEntry("posts", slug);
        if (postEntry) {
            const { title, description, image, canonical_url, date, isPublished, tags} = postEntry.data;
            return {
                slug: postEntry.slug,
                title,
                description,
                image,
                canonical_url,
                date,
                isPublished,
                tags,
                render: postEntry.render,
            };
        }
    }
}