import {render, screen} from "@testing-library/react";
import {CodeBlockToCopy} from "@components/react/codeBlockToCopy/CodeBlockToCopy.tsx";
import userEvent from "@testing-library/user-event";

describe("CodeBlockToCopy", () => {
    it("should render", () => {
        const {container} = render(<CodeBlockToCopy><p></p></CodeBlockToCopy>)

        expect(container).toBeInTheDocument();
    });
    it('should copy the content of children', async () => {
        const toCopy = "content to copy"
        const onCopy = vi.fn();
        render(<CodeBlockToCopy onCopy={onCopy}><p>{toCopy}</p></CodeBlockToCopy>)

        const copyButton = screen.getByLabelText("Copy code block");
        await userEvent.click(copyButton);

        expect(onCopy).toHaveBeenCalledWith(toCopy);
    });
});
