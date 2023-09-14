import type {Post} from "../../../domain/model/Post.ts";

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