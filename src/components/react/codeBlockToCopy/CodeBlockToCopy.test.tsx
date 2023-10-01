import {render} from "@testing-library/react";
import {CodeBlockToCopy} from "@components/react/codeBlockToCopy/CodeBlockToCopy.tsx";

describe("CodeBlockToCopy", () => {
    it("should render", () => {
        const { container } = render(<CodeBlockToCopy><p></p></CodeBlockToCopy>)

        expect(container).toBeInTheDocument();
    });
});