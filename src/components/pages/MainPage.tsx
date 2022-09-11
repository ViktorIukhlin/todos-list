import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { useEffect, useRef, useState } from "react";
import { GET_TODOS } from "../../lib/api";
import { SortType } from "../../lib/enum";
import {
    getNewTodoId,
    getSortedItemsByStatus,
    isTitleContained,
    SortedItems,
} from "../../lib/functions";

import { Todo, TodoData, TodoVars } from "../../lib/interfaces";
import { Button } from "../atoms/Button";
import { Search } from "../atoms/Search";
import { TabsBar } from "../atoms/TabsBar";
import Notification, { NotificationProps } from "../organisms/Notification";
import { Table } from "../organisms/Table";
import TodoModal from "../organisms/TodoModal";

interface lazyLoadingProps {
    refObserverContainer: React.MutableRefObject<null | HTMLElement>;
    refItemsContainer: React.MutableRefObject<null | HTMLElement>;
}

const options = {
    paginate: {
        page: 1,
        limit: 20,
    },
};

const MainPage = (): JSX.Element => {
    const { loading, error, data, refetch } = useQuery<TodoData, TodoVars>(
        GET_TODOS,
        {
            variables: {
                options,
            },
        }
    );

    const [sortType, setSortType] = useState<SortType>(SortType.NONE);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lazyLoadingObj, setLazyLoadingObj] = useState<any>(undefined);
    const [searchData, setSearchData] = useState<SortedItems | null>(null);
    const [sortedData, setSortedData] = useState<SortedItems>({
        important: [],
        items: [],
    });
    const [searchValue, setSearchValue] = useState<string>("");
    const ref = useRef(null);
    const refWrapper = useRef(null);
    const [todoModal, setTodoModal] = useState<boolean>(false);
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
    const [smallLoader, setSmallLoader] = useState<boolean>(false);
    const [notification, setNotification] =
        useState<NotificationProps | null>(null);

    const handleStatus = (item: Todo): void => {
        if (sortType === SortType.NONE) {
            setSortedData((prevState) => ({
                important: prevState.important.map((todo) => {
                    if (todo.id === item.id) {
                        return { ...item, completed: true };
                    }
                    return todo;
                }),
                items: prevState.items,
            }));
        }

        if (sortType === SortType.TO_DO) {
            return setSortedData((prevState) => ({
                important: prevState.important.filter(
                    (todo) => todo.id !== item.id
                ),
                items: [{ ...item, completed: true }, ...prevState.items],
            }));
        }

        if (sortType === SortType.DONE) {
            return setSortedData((prevState) => ({
                important: [
                    ...prevState.important,
                    { ...item, completed: true },
                ],
                items: prevState.items.filter((todo) => todo.id !== item.id),
            }));
        }
    };

    const handleDelete = (item: Todo): void => {
        setNotification({
            title: "Deleting The Todo",
            message: `Do you really want to delete _"${item.title}"_ Todo?`,
            approveText: "Delete",
            onClose: () => {
                setNotification(null);
            },
            onConfirm: () => {
                setNotification(null);
                setSortedData((prevState) => ({
                    important: prevState.important.filter(
                        (todo) => todo.id !== item.id
                    ),
                    items: prevState.items.filter(
                        (todo) => todo.id !== item.id
                    ),
                }));
            },
        });
    };

    const handleConfirmModal = (item: Todo) => {
        if (item.id) {
            setSortedData((prevState) => {
                const items: SortedItems = {
                    important: prevState.important.map((todo) => {
                        if (todo.id === item.id) {
                            return item;
                        }
                        return todo;
                    }),
                    items: prevState.items.map((todo) => {
                        if (todo.id === item.id) {
                            return item;
                        }
                        return todo;
                    }),
                };

                return getSortedItemsByStatus(
                    [...items.important, ...items.items],
                    sortType
                );
            });
        } else {
            if (item.completed) {
                setSortedData((prevState) => ({
                    important: [
                        { ...item, id: getNewTodoId() },
                        ...prevState.important,
                    ],
                    items: prevState.items,
                }));
            } else {
                setSortedData((prevState) => ({
                    important: prevState.important,
                    items: [
                        { ...item, id: getNewTodoId() },
                        ...prevState.items,
                    ],
                }));
            }
        }
    };

    const handleEdit = (todo: Todo) => {
        setCurrentTodo(todo);
        setTodoModal(true);
    };

    const handleUpdate = (): void => {
        setSmallLoader(true);

        refetch({
            options: {
                paginate: {
                    page: currentPage + 1,
                    limit: 20,
                },
            },
        }).then(() => {
            setSmallLoader(false);
        });

        setCurrentPage(currentPage + 1);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);

        if (!searchValue.trim()) {
            return setSearchData(null);
        }

        const items = [...sortedData.important, ...sortedData.items];

        const result = items?.reduce((acc: Todo[], todo: Todo) => {
            if (isTitleContained(todo.title, searchValue)) {
                const tSearchValue = searchValue.trim();
                acc.push({
                    ...todo,
                    title: todo.title.replace(
                        tSearchValue,
                        `**${tSearchValue}**`
                    ),
                });

                return acc;
            }
            return acc;
        }, []);

        const sortedResult = getSortedItemsByStatus(result, sortType);

        setSearchData({
            important: sortedResult.important,
            items: sortedResult.items,
        });
    };

    const handleTab = (tabName: SortType) => {
        setSortType(tabName);
    };

    const activateLazyLoading = ({
        refObserverContainer,
        refItemsContainer,
    }: lazyLoadingProps) => {
        if (refItemsContainer.current && refObserverContainer.current) {
            const itemsContainer = refItemsContainer.current;
            const observerContainer = refObserverContainer.current;

            if (itemsContainer.children.length <= 10) return;

            const options = { root: observerContainer, threshold: 0.9 };

            const anchorElement: Element =
                itemsContainer.lastElementChild as Element;

            const observer = new IntersectionObserver((elements, observer) => {
                elements.forEach((element) => {
                    if (element.isIntersecting === true) {
                        handleUpdate();

                        observer.unobserve(anchorElement);
                        setLazyLoadingObj(undefined);
                    }
                });
            }, options);

            observer.observe(anchorElement);

            setLazyLoadingObj({
                observer: observer,
                anchorElement: anchorElement,
            });
        }
    };

    // Use Effects
    useEffect(() => {
        if (lazyLoadingObj) {
            lazyLoadingObj.observer.unobserve(lazyLoadingObj.anchorElement);
            setLazyLoadingObj(undefined);
        }
        if (searchValue) return;

        activateLazyLoading({
            refObserverContainer: refWrapper,
            refItemsContainer: ref,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedData, searchData]);

    useEffect(() => {
        const newData = data?.todos.data;

        if (newData) {
            const newSortedData = getSortedItemsByStatus(newData, sortType);

            setSortedData((prevState) => ({
                important: [...prevState.important, ...newSortedData.important],
                items: [...prevState.items, ...newSortedData.items],
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (searchData) {
            setSearchData(
                getSortedItemsByStatus(
                    [...searchData.important, ...searchData.items],
                    sortType
                )
            );
        } else {
            setSortedData(
                getSortedItemsByStatus(
                    [...sortedData.important, ...sortedData.items],
                    sortType
                )
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    return (
        <>
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
                            onClick={() => {
                                setTodoModal(true);
                            }}
                            icon="plus"
                        />
                    </div>
                </div>
                <div className="main-page__table-container">
                    <Table
                        loading={loading}
                        data={
                            searchData
                                ? [...searchData.important, ...searchData.items]
                                : [...sortedData.important, ...sortedData.items]
                        }
                        error={error}
                        itemsRef={ref}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onStatus={handleStatus}
                        actionsContent={
                            <div className="main-page__actions-container">
                                <Search
                                    onChange={handleSearch}
                                    value={searchValue}
                                    placeholder={"Search by title"}
                                />
                                <div className="main-page__tabs-container">
                                    Sort by status:
                                    <TabsBar
                                        tabs={Object.values(SortType)}
                                        activeTab={sortType}
                                        loading={loading}
                                        tabCallback={handleTab}
                                    />
                                </div>
                            </div>
                        }
                    />
                    {smallLoader && (
                        <div className="spinner main-page__small-loader" />
                    )}
                </div>
            </div>
            {todoModal && (
                <TodoModal
                    todo={currentTodo}
                    onClose={() => {
                        setTodoModal(false);
                        setCurrentTodo(null);
                    }}
                    onConfirm={handleConfirmModal}
                />
            )}
            {notification && <Notification {...notification} />}
        </>
    );
};

export default MainPage;
