import { useEffect, useState } from "react";
import { customFetch } from "../../../../utils/utils";
import { UsersList } from "./UsersList";
import { searchUserBy } from "../../helpers/SearchUserBy";

export const Sidebar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        const searchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await customFetch.get(`/users?${searchUserBy(searchTerm)}`);
                const data = response.data;
                setUsers(data);
                setIsError(false);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        searchUsers();
    }, [searchTerm])

    return (
        <aside className="dashboard__aside sidebar">
            <p className="sidebar__title">Поиск сотрудников</p>
            <form className="sidebar__form">
                <input
                    className="sidebar__input"
                    placeholder="Введите id или имя"
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </form>
            <p className="sidebar__title">Результаты</p>

            <UsersList loading={isLoading} error={isError} users={users} searchTerm={searchTerm} />
        </aside>
    )
}
