import {getCollection, getEntry} from "astro:content";
import type {PresentationRepository} from "@application/presentation/repository/presentationRepository.ts";
import type {Presentation} from "@domain/model/Presentation.ts";

export class PresentationAstroContentAdapter implements PresentationRepository {
    async findAllPresentations(){
        const presentationCollection = await getCollection("presentations");
        const allPresentations: Presentation[] = presentationCollection.map((presentation) => {
            const  { title, description, image, date, isPublished, tags} = presentation.data;
            return {
                slug: presentation.slug,
                title,
                description,
                image,
                date,
                isPublished,
                tags,
            };
        });

        return allPresentations.filter((presentation) => presentation.isPublished);
    }

    async findPresentationBySlug(slug: string){
        const presentationEntry = await getEntry("presentations", slug);
        if (presentationEntry) {
            const { title, description, image, date, isPublished, tags} = presentationEntry.data;
            return {
                slug: presentationEntry.slug,
                title,
                description,
                image,
                date,
                isPublished,
                tags,
                render: presentationEntry.render,
            };
        }
    }
}