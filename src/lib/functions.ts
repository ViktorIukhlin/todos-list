import { SortType } from "./enum";
import { Todo } from "./interfaces";

export interface SortedItems {
    important: Todo[];
    items: Todo[];
}

export const getSortedItemsByStatus = (
    data: Todo[],
    status: SortType
): SortedItems => {
    const sortedItems: SortedItems = {
        important: [],
        items: [],
    };

    if (status === SortType.DONE) {
        return data.reduce((acc, item) => {
            if (item.completed) {
                acc.important.push(item);
            } else {
                acc.items.push(item);
            }
            return acc;
        }, sortedItems);
    }

    if (status === SortType.TO_DO) {
        return data.reduce((acc, item) => {
            if (item.completed) {
                acc.items.push(item);
            } else {
                acc.important.push(item);
            }
            return acc;
        }, sortedItems);
    }

    const sortedItemsById = [...data];
    sortedItemsById.sort((a, b) => {
        return b.id - a.id;
    });

    return {
        important: sortedItemsById,
        items: [],
    };
};

export const isTitleContained = (
    title: string,
    searchValue: string
): boolean => {
    return title
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
};

export const getNewTodoId = () => {
    return Math.floor(Math.random() * (100000000 - 1000)) + 1000;
};
