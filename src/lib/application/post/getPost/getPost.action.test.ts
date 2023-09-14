import type {Post} from "../../../domain/model/Post.ts";
import type {PostRepository} from "../repository/postRepository";

describe("getPost should", () => {
    it("return a single post", async () => {
        const post: Post = {
            slug: "slug",
            title: "title",
            description: "description",
            date: "2021-01-01",
            tags: ["tag1", "tag2"]
        };

        const PostRepository: PostRepository = {
            findAllPosts: vi.fn(),
            findPostBySlug: vi.fn()..mockResolvedValue(post),
        }
        const getPost = new GetPost(PostRepository);

        const singlePost = await getPost.execute(post.slug);

        expect(singlePost).toEqual(post);
    });
});