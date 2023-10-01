import {getCollection, getEntry} from "astro:content";
import type {ProjectRepository} from "@application/project/repository/ProjectRepository.ts";

export class ProjectAstroContentAdapter implements ProjectRepository{
    async findAllProjects(){
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

    async findProjectBySlug(slug: string){
        const projectEntry = await getEntry("projects", slug);
        if (projectEntry) {
            const {title, image, repository, demo, date} = projectEntry.data;
            return {
                slug: projectEntry.slug,
                title,
                image,
                repository,
                demo,
                date,
                render: projectEntry.render,
            };
        }
    }

}