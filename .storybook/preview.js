// Define viewports
const customViewports = {
    375: {
        name: "375",
        styles: {
            width: "375px",
            height: "667px",
        },
    },
    768: {
        name: "768",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    1024: {
        name: "1024",
        styles: {
            width: "1024px",
            height: "1024px",
        },
    },
    1440: {
        name: "1440",
        styles: {
            width: "1440px",
            height: "1024px",
        },
    },
    1600: {
        name: "1600",
        styles: {
            width: "1600px",
            height: "1024px",
        },
    },
};

export const parameters = {
    viewport: { viewports: customViewports },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
