import {GetAllPresentations} from "./getAllPresentations.action.ts";
import type {PresentationRepository} from "../repository/presentationRepository.ts";
import type {Presentation} from "@domain/model/Presentation.ts";

describe("getAllPresentations should", () => {
    it("return all presentations", async () => {
        const presentations: Presentation[] = [
            {
                slug: "slug",
                title: "title",
                description: "description",
                date: new Date("2021-01-01"),
                isPublished: true,
                tags: ["tag1", "tag2"]
            },
            {
                slug: "slug2",
                title: "title2",
                description: "description2",
                date: new Date("2021-01-02"),
                isPublished: true,
                tags: ["tag1", "tag2"]
            }
        ];
        const presentationRepository: PresentationRepository = {
            findAllPresentations: vi.fn().mockResolvedValue(presentations),
            findPresentationBySlug: vi.fn()
        }
        const getAllPresentations = new GetAllPresentations(presentationRepository);

        const allPresentations = await getAllPresentations.execute();

        expect(allPresentations).toEqual(presentations);
    });

    it("return presentations sorted by date in ascending order", async () => {
        const latestPresentation: Presentation = {
            slug: "slug2",
            title: "title2",
            description: "description2",
            date: new Date("2021-01-02"),
            isPublished: true,
            tags: ["tag1", "tag2"]
        };
        const presentations: Presentation[] = [
            {
                slug: "slug",
                title: "title",
                description: "description",
                date: new Date("2021-01-01"),
                isPublished: true,
                tags: ["tag1", "tag2"]
            },
            latestPresentation
        ];
        const PresentationRepository: PresentationRepository = {
            findAllPresentations: vi.fn().mockResolvedValue(presentations),
            findPresentationBySlug: vi.fn()
        }
        const getAllPresentation = new GetAllPresentations(PresentationRepository);

        const allPresentations = await getAllPresentation.execute();

        expect(allPresentations[0]).toStrictEqual(latestPresentation);
    });
});