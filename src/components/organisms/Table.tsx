import { ApolloError } from "@apollo/client/errors";
import { NavigateFunction } from "react-router-dom";
import { Todo } from "../../lib/interfaces";
import { Button } from "../atoms/Button";
import { Search } from "../atoms/Search";
import { StatusFlag } from "../atoms/StatusFlag";

interface TableProps {
    data: Todo[] | undefined;
    loading: boolean;
    error?: ApolloError;
    onSort(status: "Done" | "To-do"): void;
    itemsRef: any;
    className?: string;
    searchText: string;
    onSearch(searchText: string): void;
    onDelete(id: number): void;
    onNavigate: NavigateFunction;
    onStatus(id: number): void;
}

export const Table = ({
    data,
    loading,
    error,
    onSort,
    itemsRef,
    searchText,
    onSearch,
    onDelete,
    onNavigate,
    onStatus,
    className,
}: TableProps): JSX.Element => {
    return (
        <table className={`table ${className}`}>
            <thead className="table__head">
                <th className="table__actions-bar" colSpan={6}>
                    <Search
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onSearch(e.target.value)
                        }
                        value={searchText}
                        placeholder="Search by title or id..."
                    />
                </th>

                <tr>
                    <th>ID</th>
                    <th>TITLE</th>
                    <th>AUTHOR</th>
                    <th>
                        <div className="table__actions-box">
                            <Button
                                onClick={() => onSort("Done")}
                                icon="arrow-up"
                                color="success"
                                className="table__filter-buttons"
                            />
                            <Button
                                onClick={() => onSort("To-do")}
                                icon="arrow-up"
                                color="warning"
                                className="table__filter-buttons"
                            />
                            STATUS
                        </div>
                    </th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody ref={itemsRef}>
                {loading ? (
                    <tr>
                        <td>Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td>Error...</td>
                    </tr>
                ) : data ? (
                    data.map(({ id, title, completed, user }) => (
                        <tr key={id} className="table__field">
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{user.name}</td>
                            <td>
                                <div className="table__items-right">
                                    <StatusFlag done={completed} />
                                </div>
                            </td>
                            <td>
                                <div className="table__actions-box">
                                    {!completed && (
                                        <Button
                                            onClick={() => onStatus(id)}
                                            icon="done"
                                            color="success"
                                        />
                                    )}
                                    <Button
                                        onClick={() =>
                                            onNavigate(`/todo?id=${id}`)
                                        }
                                        icon="edit"
                                        color="primary"
                                    />
                                    <Button
                                        onClick={() => onDelete(id)}
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
