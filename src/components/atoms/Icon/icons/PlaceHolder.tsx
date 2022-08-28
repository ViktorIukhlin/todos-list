import { SVGProps } from "react";

export default function Placeholder(
    props: SVGProps<SVGSVGElement>
): JSX.Element {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="#323232"
            data-icon="placeholder"
            {...props}
        >
            <path
                opacity="0.3"
                d="M3.08 5L3 5.08V19H20.92C20.95 18.98 20.98 18.94 21 18.92V5.08L20.92 5H3.08ZM5 17L8.5 12.5L11 15.51L14.5 11L19 17H5Z"
            />
            <path d="M21 3H3C2 3 1 4 1 5V19C1 20.1 1.9 21 3 21H21C22 21 23 20 23 19V5C23 4 22 3 21 3ZM21 18.92C20.98 18.95 20.94 18.98 20.92 19H3V5.08L3.08 5H20.91C20.94 5.02 20.97 5.06 20.99 5.08V18.92H21ZM11 15.51L8.5 12.5L5 17H19L14.5 11L11 15.51Z" />
        </svg>
    );
}
