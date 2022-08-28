import { SVGProps } from "react";

export default function Delete(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={14}
            height={18}
            viewBox="0 0 14 18"
            fill="#323232"
            data-icon="delete"
            {...props}
        >
            <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" />
        </svg>
    );
}
