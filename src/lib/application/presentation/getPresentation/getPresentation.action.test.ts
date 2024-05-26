import {GetPresentation} from "./getPresentation.action.ts";
import type {PresentationToRenderDto} from "../dto";
import type {PresentationRepository} from "../repository/presentationRepository.ts";

describe("getPresentation should", () => {
    it("return a single post", async () => {
        const presentation: PresentationToRenderDto = {
            slug: "slug",
            title: "title",
            description: "description",
            date: new Date("2021-01-01"),
            isPublished: true,
            tags: ["tag1", "tag2"],
            render: vi.fn()
        };

        const PresentationRepository: PresentationRepository = {
            findAllPresentations: vi.fn(),
            findPresentationBySlug: vi.fn().mockResolvedValue(presentation),
        }
        const getPresentation = new GetPresentation(PresentationRepository);

        const singlePresentation = await getPresentation.execute("slug");

        expect(singlePresentation).toEqual(presentation);
    });
});