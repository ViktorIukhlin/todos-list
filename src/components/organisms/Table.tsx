import { ApolloError } from "@apollo/client/errors";
import ReactMarkdown from "react-markdown";
import { Todo } from "../../lib/interfaces";
import { Button } from "../atoms/Button";
import Skeleton from "../atoms/Skeleton";
import { StatusFlag } from "../atoms/StatusFlag";

interface TableProps {
    data: Todo[] | undefined;
    loading: boolean;
    error?: ApolloError;
    itemsRef: any;
    className?: string;
    onDelete(todo: Todo): void;
    onEdit(todo: Todo): void;
    onStatus(todo: Todo): void;
    actionsContent: JSX.Element;
}

const tableSkeletons = Array.from({ length: 20 }, (_, i) => i);

export const Table = ({
    data,
    loading,
    error,
    itemsRef,
    onDelete,
    onEdit,
    onStatus,
    className,
    actionsContent,
}: TableProps): JSX.Element => {
    return (
        <table className={`table ${className}`}>
            <thead className="table__head">
                <th className="table__actions-bar" colSpan={6}>
                    {actionsContent}
                </th>

                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>AUTHOR</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody ref={itemsRef}>
                {loading ? (
                    tableSkeletons.map((skeleton) => (
                        <tr key={skeleton}>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                            <td>
                                <Skeleton />
                            </td>
                        </tr>
                    ))
                ) : error ? (
                    <tr>
                        <td>Error...</td>
                    </tr>
                ) : data ? (
                    data.map((todo) => (
                        <tr key={todo.id} className="table__field">
                            <td>{todo.id}</td>
                            <td>
                                <ReactMarkdown>{todo.title}</ReactMarkdown>
                            </td>
                            <td>{todo.user.name}</td>
                            <td>
                                <div className="table__items-right">
                                    <StatusFlag done={todo.completed} />
                                </div>
                            </td>
                            <td>
                                <div className="table__actions-box">
                                    {!todo.completed && (
                                        <Button
                                            onClick={() => onStatus(todo)}
                                            icon="done"
                                            color="success"
                                        />
                                    )}
                                    <Button
                                        onClick={() => onEdit(todo)}
                                        icon="edit"
                                        color="primary"
                                    />
                                    <Button
                                        onClick={() => onDelete(todo)}
                                        icon="delete"
                                        color="danger"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>No data</tr>
                )}
            </tbody>
        </table>
    );
};
