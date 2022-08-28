import { SVGProps } from "react";

export default function ArrowUp(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="#323232"
            data-icon="arrow-up"
            {...props}
        >
            <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" />
        </svg>
    );
}
