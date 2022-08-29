import { gql } from "@apollo/client";

export const GET_TODO = gql`
    query ($id: ID!) {
        todo(id: $id) {
            title
        }
    }
`;

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
        updateTodo(id: $id, input: $input) {
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
