import type {Post} from "../../../domain/model/Post.ts";
import type {PostRepository} from "../repository/postRepository";

class GetPost {
    constructor(private readonly postRepository: PostRepository) {}

    async execute(slug: string) {
        return await this.postRepository.findPostBySlug(slug);
    }
}

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
            findPostBySlug: vi.fn().mockResolvedValue(post),
        }
        const getPost = new GetPost(PostRepository);

        const singlePost = await getPost.execute("slug");

        expect(singlePost).toEqual(post);
    });
});