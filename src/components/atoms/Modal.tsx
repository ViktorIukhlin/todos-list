import { HTMLProps } from "react";

interface HeaderProps extends HTMLProps<HTMLDivElement> {
    title: string;
    actions?: JSX.Element;
}

const Wrapper = ({
    children,
    className,
}: HTMLProps<HTMLDivElement>): JSX.Element => (
    <div className={`modal__wrapper flex-center ${className ?? ""}`}>
        {children}
    </div>
);

const Header = ({ title, actions, className }: HeaderProps): JSX.Element => (
    <div className={`modal__header flex-center ${className ?? ""}`}>
        <div className="modal__title">{title}</div>
        <div className="modal__actions">{actions ?? actions}</div>
    </div>
);

const Body = ({
    children,
    className,
    ...props
}: HTMLProps<HTMLDivElement>): JSX.Element => (
    <div className={`modal__body  ${className ?? ""}`} {...props}>
        {children}
    </div>
);

const Footer = ({
    children,
    className,
}: HTMLProps<HTMLDivElement>): JSX.Element => (
    <div className={`modal__footer ${className ?? ""}`}>{children}</div>
);

const Modal = { Wrapper, Header, Body, Footer };

export default Modal;
