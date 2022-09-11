interface InputProps {
    value: string;
    name?: string;
    placeholder: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    className?: string;
}

export const Input = ({
    value,
    name,
    onChange,
    placeholder,
    className,
}: InputProps): JSX.Element => (
    <div className={`input ${className && className}`}>
        <input
            value={value}
            name={name}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
        ></input>
    </div>
);
