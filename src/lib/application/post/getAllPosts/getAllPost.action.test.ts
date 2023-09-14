import type {Post} from "../../../domain/model/Post.ts";
import {GetAllPost} from "./getAllPosts.action.ts";
import type {PostRepository} from "../repository/postRepository";

describe("getAllPost should", () => {
    it("return all posts", async () => {
        const posts: Post[] = [
            {
                title: "title",
                description: "description",
                date: "2021-01-01",
                tags: ["tag1", "tag2"]
            },
            {
                title: "title2",
                description: "description2",
                date: "2021-01-02",
                tags: ["tag1", "tag2"]
            }
        ];
        const PostRepository: PostRepository = {
            getAllPosts: vi.fn().mockResolvedValue(posts)
        }
        const getAllPost = new GetAllPost(PostRepository);

        const allPosts = await getAllPost.execute();

        expect(allPosts).toEqual(posts);
    });
});