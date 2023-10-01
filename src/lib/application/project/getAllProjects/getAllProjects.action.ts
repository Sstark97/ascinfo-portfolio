import type {ProjectRepository} from "../repository/ProjectRepository.ts";

export class GetAllProjects {
    constructor(private readonly projectRepository: ProjectRepository) {}
    async execute() {
        const allProjects = await this.projectRepository.findAllProjects();

        return allProjects.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
}