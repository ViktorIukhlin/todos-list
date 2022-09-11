import { SVGProps } from "react";

export default function Close(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="#323232"
            data-icon="close"
            {...props}
        >
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
        </svg>
    );
}
