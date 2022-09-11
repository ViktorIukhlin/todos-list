import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_TODO, UPDATE_TODO } from "../../lib/api";
import { Todo } from "../../lib/interfaces";

import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";

const TodoPage = (currentTodo: Todo): JSX.Element => {
    const [todo, setTodo] = useState<Todo>(currentTodo);

    const globalCache = useApolloClient().cache;

    const [newTodo, setNewTodo] = useState({
        title: todo ? todo.title : "",
    });

    const [createTodo] = useMutation(CREATE_TODO);
    const [updateTodo] = useMutation(UPDATE_TODO);

    const navigate = useNavigate();

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewTodo({ title: value });
    };

    const createHandler = () => {
        // if (todo) {
        //     return updateTodo({
        //         variables: {
        //             id: todo.id,
        //             input: { title: newTodo.title, completed: todo.completed },
        //         },
        //     })
        //         .then((res) => {
        //             globalCache.modify({
        //                 fields: {
        //                     todos() {
        //                         const Todos: Todo[] | undefined =
        //                             data?.todos.data.map((item) => {
        //                                 if (item.id === todo?.id) {
        //                                     return { ...item, ...newTodo };
        //                                 }
        //                                 return item;
        //                             });
        //                         return Todos;
        //                     },
        //                 },
        //             });
        //             navigate("/");
        //         })
        //         .catch(() => {
        //             console.log("ERROR");
        //         });
        // }
        // createTodo({
        //     variables: { input: { title: newTodo.title, completed: false } },
        // })
        //     .then((res) => {
        //         globalCache.modify({
        //             fields: {
        //                 todos() {
        //                     let Todos: any = [...(data?.todos.data as [])];
        //                     Todos?.unshift({
        //                         id: Todos.length + 1,
        //                         completed: res.data.createTodo.completed,
        //                         title: res.data.createTodo.title,
        //                         user: {
        //                             id: 999,
        //                             name: "User",
        //                         },
        //                         __typename: "Todo",
        //                     });
        //                     return Todos;
        //                 },
        //             },
        //         });
        //         navigate("/");
        //     })
        //     .catch(() => {
        //         console.log("ERROR");
        //         navigate("/");
        //     });
    };

    return (
        <div className="todo-page">
            <div className="todo-page__actions-container">
                <div className="todo-page__description-container">
                    <h1 className="todo-page__title">
                        Todo {todo ? todo.id : "page"}
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
