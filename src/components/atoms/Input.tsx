interface InputProps {
    value: string;
    placeholder: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    className?: string;
}

export const Input = ({
    value,
    onChange,
    placeholder,
    className,
}: InputProps): JSX.Element => (
    <div className={`input ${className}`}>
        <input
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
        ></input>
    </div>
);
