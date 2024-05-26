import type {PresentationToRenderDto} from "../dto";
import type {Presentation} from "@domain/model/Presentation.ts";

export interface PresentationRepository {
    findAllPresentations: () => Promise<Presentation[]>;
    findPresentationBySlug: (slug: string) => Promise<PresentationToRenderDto | undefined>;
}