import {getCollection} from "astro:content";
import type {ProjectRepository} from "../../application/project/repository/ProjectRepository.ts";
import type {Project} from "../../domain/model/Project.ts";

export class ProjectAstroContentAdapter implements ProjectRepository{
    async findAllProjects(): Promise<Project[]> {
        const projectsCollection = await getCollection("projects");
        return projectsCollection.map((project) => {
            const {title, image, repository, demo, date} = project.data;
            return {
                slug: project.slug,
                title,
                image,
                repository,
                demo,
                date,
            };
        });
    }

}