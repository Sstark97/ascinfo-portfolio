import {GetAllProjects} from "./getAllProjects.action";
import type {Project} from "../../../domain/model/Project.ts";
import type {ProjectRepository} from "../repository/ProjectRepository.ts";

describe("GetAllProjects should", () => {
    it("return all projects", async () => {
        const projects: Project[] = [
            {
                title: "project1",
                repository: "http://github.com",
                demo: "http://demo.com",
                date: new Date("2021-01-01")
            },
            {
                title: "project2",
                repository: "http://github.com",
                demo: "http://demo.com",
                date: new Date("2021-01-02")
            }
        ];
        const ProjectRepository: ProjectRepository = {
            findAllProjects: vi.fn().mockResolvedValue(projects),
            findProjectBySlug: vi.fn()
        }
        const getAllProjects = new GetAllProjects(ProjectRepository);

        const allProjects = await getAllProjects.execute();

        expect(allProjects).toEqual(projects);
    });
});