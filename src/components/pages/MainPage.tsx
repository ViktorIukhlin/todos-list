import { Reference } from "@apollo/client/cache/inmemory/types";
import { useApolloClient } from "@apollo/client/react/hooks/useApolloClient";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_TODO } from "../../lib/api";
import { useLazyLoading } from "../../lib/hooks/useLazyLoading";
import { Todo } from "../../lib/interfaces";
import { Props } from "../../routes";
import { Button } from "../atoms/Button";
import { Table } from "../organisms/Table";

const MainPage = ({ loading, error, data, refetch }: Props): JSX.Element => {
    const [todosLimit, setTodosLimit] = useState<number>(30);
    const [searchText, setSearchText] = useState<string>("");
    const globalCache = useApolloClient().cache;
    const navigate = useNavigate();

    const ref = useRef(null);
    const refWrapper = useRef(null);

    const [deleteTodo] = useMutation(DELETE_TODO);

    const getSortedItemsByStatus = (status: "Done" | "To-do"): void => {
        globalCache.modify({
            fields: {
                todos(_, { readField }) {
                    const sortedTodos = [...(data?.todos.data as [])];

                    sortedTodos.sort(
                        (todoRefa: Reference, todoRefb: Reference) => {
                            const a = readField("completed", todoRefa) ? 1 : 2;
                            const b = readField("completed", todoRefb) ? 1 : 2;

                            if (status === "Done") {
                                return a - b;
                            } else {
                                return b - a;
                            }
                        }
                    );

                    return sortedTodos;
                },
            },
        });
    };

    const handleStatus = (id: number): void => {
        globalCache.modify({
            fields: {
                todos() {
                    const Todos: Todo[] | undefined = data?.todos.data.map(
                        (item) => {
                            if (item.id === id) {
                                return { ...item, completed: true };
                            }

                            return item;
                        }
                    );

                    return Todos;
                },
            },
        });
    };

    const handleUpdate = (): void => {
        const newTodosLimit = todosLimit + 20;

        refetch({
            options: {
                paginate: {
                    page: 1,
                    limit: newTodosLimit,
                },
            },
        });

        setTodosLimit(newTodosLimit);
    };

    const handleSearch = (searchText: string): void => {
        refetch({
            options: {
                paginate: {
                    page: 1,
                    limit: 30,
                },
                search: {
                    q: searchText,
                },
            },
        });
        setSearchText(searchText);
    };

    const handleDelete = (id: number): void => {
        deleteTodo({
            variables: { id },
        }).then((res) => {
            if (res.data.deleteTodo) {
                globalCache.modify({
                    fields: {
                        todos(existingTodoRefs, { readField }) {
                            return existingTodoRefs.data.filter(
                                (todoRef: Reference) =>
                                    id !== readField("id", todoRef)
                            );
                        },
                    },
                });
            } else {
                console.log("ERROR");
            }
        });
    };

    useLazyLoading({
        depth: data?.todos.data.length || 0,
        refObserverContainer: refWrapper,
        refItemsContainer: ref,
        updateData: handleUpdate,
    });

    return (
        <div className="main-page" ref={refWrapper}>
            <div className="main-page__actions-container">
                <div className="main-page__description-container">
                    <h1 className="main-page__title">Main page</h1>
                    <span className="main-page__subtext">
                        This is your todos admin panel :)
                    </span>
                </div>
                <div className="main-page__button-container">
                    <Button
                        text="Create todo"
                        color="primary"
                        onClick={() => navigate("/todo")}
                        icon="plus"
                    />
                </div>
            </div>
            <div className="main-page__table-container">
                <Table
                    loading={loading}
                    data={data?.todos.data}
                    error={error}
                    itemsRef={ref}
                    searchText={searchText}
                    onSort={getSortedItemsByStatus}
                    onSearch={handleSearch}
                    onDelete={handleDelete}
                    onNavigate={navigate}
                    onStatus={handleStatus}
                />
            </div>
        </div>
    );
};

export default MainPage;
