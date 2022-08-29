import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { Button } from "../Button";

const callback = jest.fn();

describe("Hyperlink component", () => {
    const setup = () => render(<Button onClick={callback} text="Click" />);

    it("should contain provided text", () => {
        setup();
        expect(screen.getByText("Click")).toBeEnabled();
    });

    it("should call a callback once", () => {
        setup();
        screen.getByText("Click").click();
        expect(callback).toBeCalledTimes(1);
    });
});
