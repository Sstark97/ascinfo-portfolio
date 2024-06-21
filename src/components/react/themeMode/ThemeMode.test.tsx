import {screen, render, waitFor} from "@testing-library/react";
import {ThemeMode} from "@components/react/themeMode/ThemeMode.tsx";
import userEvent from "@testing-library/user-event";

describe('ThemeMode', () => {
    it('should render', () => {
        render(<ThemeMode/>);
    });

    it("should change to light mode", async () => {
        render(<ThemeMode/>);
        const button = screen.getByRole("button");

        await userEvent.click(button);

        await waitFor(() => {
            expect(document.documentElement).toHaveClass("light");
        });
    });
});