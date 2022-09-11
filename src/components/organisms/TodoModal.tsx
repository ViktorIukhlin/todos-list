import { useState } from "react";
import { createPortal } from "react-dom";
import { Todo } from "../../lib/interfaces";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import Modal from "../atoms/Modal";

interface CurrentTodo {
    id?: number;
    title: string;
    completed: boolean;
    user: {
        id: number;
        name: string;
    };
}

interface TodoModalProps {
    todo: Todo | null;
    onClose(): void;
    onConfirm(todo: CurrentTodo): void;
}

const todoInitializationData = {
    title: "",
    completed: false,
    user: {
        id: 999,
        name: "",
    },
};
const noErrorsObj = { title: false, author: false };

const TodoModal = ({
    todo,
    onClose,
    onConfirm,
}: TodoModalProps): JSX.Element | null => {
    const [currentTodo, setCurrentTodo] = useState<CurrentTodo>(
        todo ? todo : todoInitializationData
    );

    const [errors, setErrors] = useState(noErrorsObj);

    const isCorrectValue = (value: string) => {
        const checkValue = value.trim();

        return checkValue.length;
    };

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === "author") {
            setErrors((prevState) => ({ ...prevState, author: false }));
            setCurrentTodo((prevState) => ({
                ...prevState,
                user: { ...prevState.user, name: value },
            }));
        } else {
            setErrors((prevState) => ({ ...prevState, title: false }));
            setCurrentTodo((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const confirmHandler = () => {
        let valid = true;
        if (!isCorrectValue(currentTodo.title)) {
            valid = false;
            setErrors((prevState) => ({ ...prevState, title: true }));
        }

        if (!isCorrectValue(currentTodo.user.name)) {
            valid = false;
            setErrors((prevState) => ({ ...prevState, author: true }));
        }

        if (valid) {
            onConfirm({
                ...currentTodo,
                title: currentTodo.title.trim(),
                user: {
                    ...currentTodo.user,
                    name: currentTodo.user.name.trim(),
                },
            });
            onClose();
        }
    };

    const element = (
        <Modal.Wrapper>
            <Modal.Header
                title={currentTodo.id ? "Editing Todo" : "Creating Todo"}
                actions={
                    <Button color="primary" onClick={onClose} icon="close" />
                }
            />
            <Modal.Body className="todoModal">
                <div className="todoModal__inputs-box">
                    <div className="todoModal__left-content">
                        <div className="todoModal__preview">
                            <div className="todoModal__label">
                                Title:{" "}
                                {errors.title && (
                                    <span className="todoModal__error">
                                        - Title must not be empty
                                    </span>
                                )}
                            </div>

                            <Input
                                name="title"
                                value={currentTodo.title}
                                onChange={inputHandler}
                                placeholder="Enter Title"
                            />
                        </div>

                        <div className="todoModal__preview">
                            <div className="todoModal__label">
                                Author:{" "}
                                {errors.author && (
                                    <span className="todoModal__error">
                                        - Author Name must not be empty
                                    </span>
                                )}
                            </div>

                            <Input
                                name="author"
                                value={currentTodo.user.name}
                                onChange={inputHandler}
                                placeholder="Enter Author Name"
                            />
                        </div>
                    </div>
                    <div className="todoModal__right-content">
                        <div className="todoModal__preview">
                            <div className="todoModal__label">Status:</div>
                            <div className="todoModal__status-actions">
                                <Button
                                    color={
                                        currentTodo.completed
                                            ? "not-active"
                                            : "warning"
                                    }
                                    onClick={() =>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            completed: false,
                                        })
                                    }
                                    icon="close"
                                />
                                <Button
                                    color={
                                        currentTodo.completed
                                            ? "success"
                                            : "not-active"
                                    }
                                    onClick={() =>
                                        setCurrentTodo({
                                            ...currentTodo,
                                            completed: true,
                                        })
                                    }
                                    icon="done"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button text="Cancel" color="primary" onClick={onClose} />
                <Button
                    text={currentTodo.id ? "Update" : "Create"}
                    color="success"
                    onClick={() => confirmHandler()}
                    disabled={!currentTodo.title || !currentTodo.user.name}
                />
            </Modal.Footer>
        </Modal.Wrapper>
    );

    return createPortal(element, document.body);
};

export default TodoModal;
