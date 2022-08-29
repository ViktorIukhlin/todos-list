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
