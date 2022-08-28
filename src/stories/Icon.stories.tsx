// Icon.stories

import { Meta, Story } from "@storybook/react";

import Icon, { IconProps } from "../components/atoms/Icon";
import ICONS, { SupportedIcon } from "../components/atoms/Icon/data";

export default {
    title: "UI/Icon",
    component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Demo = Template.bind({});
Demo.argTypes = {
    className: {
        options: ["1", "2", "3"],
        control: { type: "radio" },
    },
};
Demo.args = {
    icon: "placeholder",
    size: 24,
    className: "",
};

export const AllSupportedIcons: Story<IconProps> = (args) => (
    <div>
        {Object.keys(ICONS).map((icon) => (
            <div className="firstclass" key={icon}>
                <Icon
                    {...args}
                    icon={icon as SupportedIcon}
                    className="mx-auto"
                />
                <h5 className="mt-8 text-sm16">{icon}</h5>
            </div>
        ))}
    </div>
);
AllSupportedIcons.argTypes = {
    icon: {
        table: {
            disable: true,
        },
    },
    className: {
        table: {
            disable: true,
        },
    },
};
