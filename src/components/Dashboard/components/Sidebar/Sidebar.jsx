import { useEffect, useRef, useState } from "react";
import { customFetch } from "../../../../utils/utils";
import { UsersList } from "./UsersList";
import { searchUserBy } from "../../helpers/SearchUserBy";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";

export const Sidebar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [currentPage, setCurrentPage] = useState(2)
    const [isEnd, setIsEnd] = useState(false);
    const sidebarRef = useRef();
    const debouncedSearch = useDebounce(searchTerm);

    const navigate = useNavigate();

    const numberChecker = searchTerm.split(",").some((item) => !isNaN(+item));

    const onSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        navigate("/");
        setCurrentPage(2);
        setIsEnd(false);
    };

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await customFetch.get(`/users?${searchUserBy(debouncedSearch, 4)}`);
                const data = response.data;
                setUsers(data);
                setIsError(false);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })()

    }, [debouncedSearch])


    const fetchData = async () => {
        setIsLoading(true);
        if (isLoading) return;
        if (numberChecker) {
            return
        }
        try {
            const response = await customFetch.get(`/users?${searchUserBy(debouncedSearch, 4, currentPage)}`);
            const data = response.data;
            if (data.length) {
                setUsers((prevItems) => [...prevItems, ...data]);
                setCurrentPage((prevPage) => prevPage + 1);
            } else {
                setIsEnd(true);
            }
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
        if (scrollTop + clientHeight >= scrollHeight - 20 && !isEnd && !numberChecker) {
            fetchData();
        }
    }

    return (
        <aside className="dashboard__aside sidebar">
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

            <UsersList handleScroll={handleScroll} sidebarRef={sidebarRef} loading={isLoading} error={isError} users={users} searchTerm={searchTerm} />
        </aside>
    )
}
