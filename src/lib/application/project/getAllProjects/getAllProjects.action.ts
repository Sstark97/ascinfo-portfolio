import type {ProjectRepository} from "../repository/ProjectRepository.ts";
import type {Project} from "@domain/model/Project.ts";

export class GetAllProjects {
    constructor(private readonly projectRepository: ProjectRepository) {}
    async execute() {
        const allProjects = await this.projectRepository.findAllProjects();

        return this.getProjectsOrderByDateAsc(allProjects);
    }

    private getProjectsOrderByDateAsc(allProjects: Project[]) {
        return allProjects.sort((currentProject, nextProject) => (
            nextProject.date.getTime() - currentProject.date.getTime())
        );
    }
}