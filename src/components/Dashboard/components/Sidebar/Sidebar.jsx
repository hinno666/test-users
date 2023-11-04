import { useCallback, useEffect, useRef, useState } from "react";
import { customFetch } from "../../../../utils/utils";
import { UsersList } from "./UsersList";
import { searchUserBy } from "../../helpers/SearchUserBy";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";

export const Sidebar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const debouncedSearch = useDebounce(searchTerm);

    const navigate = useNavigate();

    const onSearchTermChange = (event) => {
        setSearchTerm(event.target.value);

        navigate("/");
    };

    useEffect(() => {
        const searchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await customFetch.get(`/users?${searchUserBy(debouncedSearch, 3)}`);
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
    }, [debouncedSearch])

    const [currentPage, setCurrentPage] = useState(1)
    const sidebarRef = useRef();

    const fetchData = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await customFetch.get(`/users?${searchUserBy(debouncedSearch, 3, currentPage)}`);
            const data = response.data;
            setUsers((prevItems) => [...prevItems, ...data]);
            setCurrentPage((prevPage) => prevPage + 1);
            setIsError(false);
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } =
            sidebarRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            fetchData();
        }
    }

    return (
        <aside ref={sidebarRef} onScroll={handleScroll} className="dashboard__aside sidebar">
            <p className="sidebar__title">Поиск сотрудников</p>
            <form className="sidebar__form">
                <input
                    className="sidebar__input"
                    placeholder="Введите id или имя"
                    type="text"
                    value={searchTerm}
                    onChange={onSearchTermChange}
                />
            </form>
            <p className="sidebar__title">Результаты</p>

            <UsersList loading={isLoading} error={isError} users={users} searchTerm={searchTerm} />
        </aside>
    )
}
