import type {Project} from "../../domain/model/Project.ts";
import type {Render} from "astro:content";

export interface ProjectToRenderDto extends Project {
    render: () => Render[".md"]
}