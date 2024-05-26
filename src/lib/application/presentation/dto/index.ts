import type {Render} from "astro:content";
import type {Presentation} from "@domain/model/Presentation.ts";

export interface PresentationToRenderDto extends Presentation{
    render: () => Render[".md"]
}