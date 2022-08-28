import { SVGProps } from "react";

export default function Plus(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="#323232"
            data-icon="add"
            {...props}
        >
            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" />
        </svg>
    );
}
