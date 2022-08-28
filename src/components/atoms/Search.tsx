import Icon from "./Icon";

interface SearchProps {
    value: string;
    placeholder: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    className?: string;
}

export const Search = ({
    value,
    onChange,
    placeholder,
    className,
}: SearchProps): JSX.Element => (
    <div className={`search ${className}`}>
        <Icon icon="search" />
        <input
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
        ></input>
    </div>
);
