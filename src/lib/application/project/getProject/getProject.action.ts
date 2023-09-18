import type {ProjectRepository} from "../repository/ProjectRepository.ts";

export class GetProject {
    constructor(private readonly projectRepository: ProjectRepository) {
    }
    async execute(slug: string) {
        return await this.projectRepository.findProjectBySlug(slug);
    }
}