import { NavLink } from "react-router-dom"
import { Loader } from "../../../Loader/Loader"
import { User } from "./User"

export const UsersList = ({ loading, error, users, searchTerm }) => {

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <p className="sidebar__subtitle">Произошла ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.</p>
    }

    if (searchTerm === '') {
        return <p className="sidebar__subtitle">начните поиск</p>
    }

    if (users.length < 1) {
        return <p className="sidebar__subtitle">не найдено</p>
    }

    return (
        <div className="sidebar__users">
            {users.map((user) => {
                return (
                    <NavLink className='sidebar__user-link' key={user.id} to={`users/${user.id}`}>
                        <User {...user} />
                    </NavLink>
                )
            })}
        </div>
    )
}