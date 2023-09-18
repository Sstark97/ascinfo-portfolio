import type {Project} from "../../../domain/model/Project.ts";

export interface ProjectRepository {
    findAllProjects: () => Promise<Project[]>;
}