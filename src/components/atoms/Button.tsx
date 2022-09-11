import Icon, { SupportedIcon } from "./Icon";

type Colors = "primary" | "success" | "warning" | "danger" | "not-active";

export interface ButtonProps {
    text?: string;
    color?: Colors;
    icon?: SupportedIcon;
    onClick(): void;
    disabled?: boolean;
    className?: string;
}

export const Button = ({
    text,
    color = "primary",
    icon,
    onClick,
    disabled,
    className,
}: ButtonProps): JSX.Element => (
    <button
        onClick={onClick}
        className={`button ${text && "type-text"} ${color} ${className}`}
        disabled={disabled}
    >
        {icon && <Icon icon={icon as SupportedIcon} size={14} />}
        {text && (
            <div className={`button__text ${icon && "margin"}`}>{text}</div>
        )}
    </button>
);
