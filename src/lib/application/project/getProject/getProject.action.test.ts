import {GetPost} from "../../post/getPost";
import type {ProjectToRenderDto} from "../index.ts";
import type {ProjectRepository} from "../repository/ProjectRepository.ts";

describe("GetProject should", () => {
    it("return a single project", async () => {
        const project: ProjectToRenderDto = {
            slug: "slug",
            title: "project1",
            repository: "http://github.com",
            demo: "http://demo.com",
            date: new Date("2021-01-01"),
            render: () => {}
        };

        const ProjectRepository: ProjectRepository = {
            findAllProjects: vi.fn(),
            findProjectBySlug: vi.fn().mockResolvedValue(project),
        }
        const getPost = new GetPost(ProjectRepository);

        const singlePost = await getPost.execute("slug");

        expect(singlePost).toEqual(project);
    });
});