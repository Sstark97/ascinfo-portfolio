import type {ProjectToRenderDto} from "../index.ts";
import type {ProjectRepository} from "../repository/ProjectRepository.ts";
import {GetProject} from "./getProject.action.ts";
import {vi} from "vitest";

describe("GetProject should", () => {
    it("return a single project", async () => {
        const project: ProjectToRenderDto = {
            slug: "slug",
            title: "project1",
            repository: "http://github.com",
            demo: "http://demo.com",
            date: new Date("2021-01-01"),
            render: vi.fn()
        };

        const ProjectRepository: ProjectRepository = {
            findAllProjects: vi.fn(),
            findProjectBySlug: vi.fn().mockResolvedValue(project),
        }
        const getProject = new GetProject(ProjectRepository);

        const singlePost = await getProject.execute("slug");

        expect(singlePost).toEqual(project);
    });
});