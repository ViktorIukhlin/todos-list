import Icon, { SupportedIcon } from "./Icon";

interface ButtonProps {
    text?: string;
    color?: string;
    icon?: SupportedIcon;
    onClick(): void;
    disabled?: boolean;
    className?: string;
}

export const Button = ({
    text,
    color,
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
        {<Icon icon={icon as SupportedIcon} size={14} />}
        {text && <div className="button__text">{text}</div>}
    </button>
);
