import type {PresentationRepository} from "../repository/presentationRepository.ts";
import type {Post} from "@domain/model/Post.ts";
import type {Presentation} from "@domain/model/Presentation.ts";

export class GetAllPresentations {
    constructor(private readonly presentationRepository: PresentationRepository) {
    }

    async execute() {
        const allPosts = await this.presentationRepository.findAllPresentations();

        return this.getPresentationsOrderByDateAsc(allPosts);
    }

    private getPresentationsOrderByDateAsc(allPresentations: Presentation[]) {
        return allPresentations.sort((currentPresentation, nextPresentation) => (
            nextPresentation.date.getTime() - currentPresentation.date.getTime()
        ));
    }
}