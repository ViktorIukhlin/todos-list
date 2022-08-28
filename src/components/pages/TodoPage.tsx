import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CREATE_TODO, UPDATE_TODO } from "../../lib/api";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

const TodoPage = (): JSX.Element => {
    let location = useLocation();
    const todoId = location.search.slice(4);

    const [newTodo, setNewTodo] = useState({
        title: "",
    });

    const [createTodo] = useMutation(CREATE_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);

    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewTodo({ title: value });
    };

    const createHandler = () => {
        createTodo({
            variables: { input: { title: newTodo.title, completed: false } },
        }).then((res) => {
            if (res.data.createTodo.title) {
                navigate("/");
            } else {
                navigate("/");
                console.log("ERROR");
            }
        });
    };

    const handleChange = (id: number, title: string, completed: boolean) => {
        updateTodo({
            variables: {
                id: id,
                input: {
                    title: "",
                    completed: completed,
                },
            },
        });
    };

    return (
        <div className="todo-page">
            <div className="todo-page__actions-container">
                <div className="todo-page__description-container">
                    <h1 className="todo-page__title">
                        Todo{todoId && " " + todoId} page
                    </h1>
                    <span className="todo-page__subtext">
                        Please fill in all fields to create todo.
                    </span>
                </div>
                <div className="todo-page__button-container">
                    <Button
                        text="Cancel"
                        color="warning"
                        onClick={() => navigate("/")}
                        icon="delete"
                    />
                    <Button
                        text="Create"
                        color="success"
                        onClick={createHandler}
                        icon="done"
                        disabled={!newTodo.title.length}
                    />
                </div>
            </div>
            <div className="todo-page__table-container">
                <Input
                    value={newTodo.title}
                    onChange={inputHandler}
                    placeholder="Enter Title"
                />
            </div>
        </div>
    );
};

export default TodoPage;
