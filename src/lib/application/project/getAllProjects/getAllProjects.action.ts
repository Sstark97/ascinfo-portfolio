import type {ProjectRepository} from "../repository/ProjectRepository.ts";

export class GetAllProjects {
    constructor(private readonly projectRepository: ProjectRepository) {}
    async execute() {
        return await this.projectRepository.findAllProjects();
    }
}