import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Button } from "../atoms/Button";
import Modal from "../atoms/Modal";

export interface NotificationProps {
    title: string;
    message: string;
    approveText: string;
    onClose(): void;
    onConfirm(): void;
}

const Notification = ({
    title,
    message,
    approveText = "Create",
    onClose,
    onConfirm,
}: NotificationProps) => {
    return (
        <Modal.Wrapper>
            <Modal.Header title={title} />
            <Modal.Body className="notification__message flex-center">
                <ReactMarkdown>{message}</ReactMarkdown>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    text="Cancel"
                    color="primary"
                    onClick={onClose}
                    icon="delete"
                />
                <Button
                    text={approveText}
                    color="danger"
                    onClick={onConfirm}
                    icon="done"
                />
            </Modal.Footer>
        </Modal.Wrapper>
    );
};

export default Notification;
