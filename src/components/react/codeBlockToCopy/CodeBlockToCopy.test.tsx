import {render, screen} from "@testing-library/react";
import {CodeBlockToCopy} from "@components/react/codeBlockToCopy/CodeBlockToCopy.tsx";
import userEvent from "@testing-library/user-event";
import {expect} from "vitest";

describe("CodeBlockToCopy", () => {
    async function clickInCopyButton() {
        const copyButton = screen.getByLabelText("Copy code block");
        await userEvent.click(copyButton);
    }

    it("should render", () => {
        const {container} = render(<CodeBlockToCopy><p></p></CodeBlockToCopy>)

        expect(container).toBeInTheDocument();
    });

    it('should copy the content of children', async () => {
        const toCopy = "content to copy"
        const onCopy = vi.fn();
        render(<CodeBlockToCopy onCopy={onCopy}><p>{toCopy}</p></CodeBlockToCopy>)

        await clickInCopyButton();

        expect(onCopy).toHaveBeenCalledWith(toCopy);
    });
    it('should show a clipboard check icon when copy the content', async () => {
        const onCopy = vi.fn();
        render(<CodeBlockToCopy onCopy={onCopy}><p></p></CodeBlockToCopy>)

        await clickInCopyButton();

        expect(screen.getByRole("graphics-document", { name: "copy-checked" })).toBeInTheDocument();
    });
});
