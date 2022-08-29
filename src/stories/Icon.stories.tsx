import { Meta, Story } from "@storybook/react";

import Icon, { IconProps } from "../components/atoms/Icon";
import ICONS, { SupportedIcon } from "../components/atoms/Icon/data";
import "./Icon.scss";

export default {
    title: "Atoms/Icon",
    component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const OneIcon = Template.bind({});
OneIcon.argTypes = {
    className: {
        options: ["green", "orange", "red", "blue"],
        control: { type: "radio" },
    },
};

OneIcon.args = {
    icon: "placeholder",
    size: 30,
};

export const AllSupportedIcons: Story<IconProps> = (args) => (
    <div className="icons-container">
        {Object.keys(ICONS).map((icon) => (
            <div key={icon} className="icon">
                <Icon {...args} icon={icon as SupportedIcon} />
                <h5>{icon}</h5>
            </div>
        ))}
    </div>
);
