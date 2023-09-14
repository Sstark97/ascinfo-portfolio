import type {Post} from "../../../domain/model/Post.ts";
import type {Render} from "astro:content";
export interface PostToRenderDto extends Post{
    render: () => Render[".md"]
}