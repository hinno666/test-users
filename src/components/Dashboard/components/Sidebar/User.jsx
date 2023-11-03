import user from '../../../../assets/images/user.svg'

export const User = ({ username, email }) => {
    return (
        <div className="sidebar__user">
            <div className="sidebar__user-img">
                <img src={user} alt={username} />
            </div>
            <div className='sidebar__user-info'>
                <p className="sidebar__user-name">{username}</p>
                <p className="sidebar__user-mail">{email}</p>
            </div>
        </div>
    )
}