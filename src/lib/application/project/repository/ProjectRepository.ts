import type {Project} from "../../../domain/model/Project.ts";
import type {ProjectToRenderDto} from "../index.ts";

export interface ProjectRepository {
    findAllProjects: () => Promise<Project[]>;
    findProjectBySlug: (slug: string) => Promise<ProjectToRenderDto | undefined>;
}