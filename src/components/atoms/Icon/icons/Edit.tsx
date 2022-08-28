import { SVGProps } from "react";

export default function Edit(props: SVGProps<SVGSVGElement>): JSX.Element {
    return (
        <svg
            width={19}
            height={18}
            viewBox="0 0 19 18"
            fill="#323232"
            data-icon="edit"
            {...props}
        >
            <path d="M15.37 0.29C15.17 0.09 14.92 0 14.66 0C14.4 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3.02 17.71 2.63L15.37 0.29ZM14.81 6.94L11.06 3.19L0 14.25V18H3.75L14.81 6.94ZM2 16V15.08L11.06 6.02L11.98 6.94L2.92 16H2Z" />
        </svg>
    );
}
