import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Icon from "../Icon";

describe("Icon component", () => {
    const setup = () =>
        render(<Icon icon="edit" size={40} data-testid="icon" />);

    it("should contain correct icon", () => {
        setup();
        expect(screen.getByTestId("icon")).toHaveAttribute(
            "data-icon",
            "handShake"
        );
    });

    it("should respect size", () => {
        setup();
        expect(screen.getByTestId("icon")).toHaveAttribute("width", "40");
    });
});
