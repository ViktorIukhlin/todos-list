import { SVGProps } from "react";

export default function Done(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={18}
            height={14}
            viewBox="0 0 18 14"
            fill="#323232"
            data-icon="done"
            {...props}
        >
            <path d="M5.9999 11.2001L1.7999 7.0001L0.399902 8.4001L5.9999 14.0001L17.9999 2.0001L16.5999 0.600098L5.9999 11.2001Z" />
        </svg>
    );
}
