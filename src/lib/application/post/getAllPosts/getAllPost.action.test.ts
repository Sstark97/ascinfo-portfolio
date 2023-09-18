import type {Post} from "../../../domain/model/Post.ts";
import {GetAllPost} from "./getAllPosts.action.ts";
import type {PostRepository} from "../repository/postRepository";

describe("getAllPost should", () => {
    it("return all posts", async () => {
        const posts: Post[] = [
            {
                slug: "slug",
                title: "title",
                description: "description",
                date: new Date("2021-01-01"),
                tags: ["tag1", "tag2"]
            },
            {
                slug: "slug2",
                title: "title2",
                description: "description2",
                date: new Date("2021-01-02"),
                tags: ["tag1", "tag2"]
            }
        ];
        const PostRepository: PostRepository = {
            findAllPosts: vi.fn().mockResolvedValue(posts),
            findPostBySlug: vi.fn()
        }
        const getAllPost = new GetAllPost(PostRepository);

        const allPosts = await getAllPost.execute();

        expect(allPosts).toEqual(posts);
    });
});