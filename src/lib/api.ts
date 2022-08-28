import { gql } from "@apollo/client";

export interface User {
    id: number;
    name: string;
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    user: User;
}

export interface TodoData {
    todos: {
        data: Todo[];
        meta: {
            totalCount: number;
        };
    };
}

export interface TodoVars {
    options: {
        paginate?: {
            page: number;
            limit: number;
        };
        search?: {
            q: string;
        };
    };
}

export const GET_TODOS = gql`
    query GetTodos($options: PageQueryOptions) {
        todos(options: $options) {
            data {
                id
                title
                completed
                user {
                    id
                    name
                }
            }
            meta {
                totalCount
            }
        }
    }
`;

export const CREATE_TODO = gql`
    mutation ($input: CreateTodoInput!) {
        createTodo(input: $input) {
            title
            completed
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation ($id: ID!, $input: UpdateTodoInput!) {
        updateTodo(title: $title, input: $input) {
            title
            completed
        }
    }
`;

export const DELETE_TODO = gql`
    mutation ($id: ID!) {
        deleteTodo(id: $id)
    }
`;
