import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const App = Route.options.component as unknown as () => JSX.Element;

describe("Roast Mode placement", () => {
  it("keeps the Roast Mode switch off the home screen", () => {
    render(<App />);

    expect(screen.getByText("Trending Now")).toBeInTheDocument();
    expect(screen.queryByRole("switch", { name: "Roast Mode" })).toBeNull();
  });

  it("offers the Roast Mode switch inside the AI Photo caption generator", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "AI Photo" }));

    expect(screen.getByRole("switch", { name: "Roast Mode" })).toBeInTheDocument();
  });
});
