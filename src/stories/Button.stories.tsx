// Button.stories
import { Meta, Story } from "@storybook/react";
import { Button, ButtonProps } from "../components/atoms/Button";
import "../styles/atoms/Button.scss";

export default {
    component: Button,
    title: "Atoms/Button",
    argTypes: { onClick: { action: "clicked" } },
} as Meta;

const customSetting = {
    color: {
        options: ["primary", "success", "warning", "danger"],
        control: { type: "radio" },
    },
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const WithText = Template.bind({});

WithText.argTypes = {
    ...customSetting,
};

WithText.args = {
    text: "Click",
    color: "primary",
};

export const WithOutText = Template.bind({});

WithOutText.argTypes = {
    ...customSetting,
};

WithOutText.args = {
    color: "primary",
};
