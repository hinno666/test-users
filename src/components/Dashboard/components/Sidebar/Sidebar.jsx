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
                const searchArray = searchTerm.split(',').map(item => `id=${item.trim()}`).join('&');
                const response = await customFetch.get(`/users?${searchArray}`);
                const data = response.data;
                setUsers(data);
                setIsLoading(false);
                setIsError(false);
            } catch (error) {
                setIsError(true);
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
                <p>Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.</p>
            ) : users.length < 1 ? (
                <p className="sidebar__subtitle">начните поиск</p>
            ) : (
                isLoading ? <Loader /> : users.map((user) => {
                    return <p key={user.id}>{user.name}</p>
                })
            )}
        </aside>
    )
}
