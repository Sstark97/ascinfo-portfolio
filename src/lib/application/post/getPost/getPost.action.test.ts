import type {PostRepository} from "../repository/postRepository";
import {GetPost} from "./getPost.action.ts";
import type {PostToRenderDto} from "../dto";
import {Render} from "astro:content";

describe("getPost should", () => {
    it("return a single post", async () => {
        const post: PostToRenderDto = {
            slug: "slug",
            title: "title",
            description: "description",
            date: "2021-01-01",
            tags: ["tag1", "tag2"],
            render: () => {}
        };

        const PostRepository: PostRepository = {
            findAllPosts: vi.fn(),
            findPostBySlug: vi.fn().mockResolvedValue(post),
        }
        const getPost = new GetPost(PostRepository);

        const singlePost = await getPost.execute("slug");

        expect(singlePost).toEqual(post);
    });
});