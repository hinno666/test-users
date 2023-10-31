import { useEffect, useState } from "react";
import { customFetch } from "../../../../utils/utils";
import { Loader } from "../../../Loader/Loader";

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
                const searchArray = searchTerm.split(',').map(item => {
                    if (!isNaN(+item)) {
                        return `id=${item.trim()}`;
                    } else {
                        return `username_like=${item.trim()}`;
                    }
                }).join('&');
                const response = await customFetch.get(`/users?${searchArray}`);
                const data = response.data;
                console.log(data);
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
            {isError ? (
                <p className="sidebar__subtitle">Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.</p>
            ) : searchTerm === '' ? (
                <p className="sidebar__subtitle">начните поиск</p>
            ) : (
                users.length < 1 ? (
                    <p className="sidebar__subtitle">не найдено</p>
                ) :
                    isLoading ? <Loader /> : users.map((user) => {
                        return <p key={user.id}>{user.username}</p>
                    })
            )}
        </aside>
    )
}
