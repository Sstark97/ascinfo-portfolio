import type {PresentationRepository} from "../repository/presentationRepository.ts";

export class GetPresentation {
    constructor(private readonly presentationRepository: PresentationRepository) {
    }

    async execute(slug: string) {
        return await this.presentationRepository.findPresentationBySlug(slug);
    }
}