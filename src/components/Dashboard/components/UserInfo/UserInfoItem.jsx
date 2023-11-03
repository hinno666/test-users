import userInfo from '../../../../assets/images/userinfo.svg'
import { Loader } from '../../../Loader/Loader';

export const UserInfoItem = ({ loading, error, user }) => {

    if (loading) {
        return <p className='dashboard__user-center'><Loader /></p>
    }

    if (error) {
        return <p className='dashboard__user-text dashboard__user-center'>Что-то пошло не так</p>
    }

    if (user.length < 1) {
        return <p className='dashboard__user-text dashboard__user-center'>Выберите сотрудника, чтобы посмотреть его профиль</p>
    }

    return (
        <>
            {user.map((item) => {
                const { id, username, email, phone } = item;
                return (
                    <div className="dashboard__user-info" key={id}>
                        <div className="dashboard__user-img">
                            <img src={userInfo} alt={username} />
                        </div>
                        <div className="dashboard__user-about">
                            <div className="dashboard__user-contacts">
                                <p className="dashboard__user-text dashboard__user-name">
                                    {username}
                                </p>
                                <p className="dashboard__user-text dashboard__user-email">
                                    <span>email:</span> {email}
                                </p>
                                <p className="dashboard__user-text dashboard__user-phone">
                                    <span>phone:</span> {phone}
                                </p>
                            </div>
                            <div className="dashboard__user-description">
                                <p className="dashboard__user-subtitle">
                                    О себе:
                                </p>
                                <p className="dashboard__user-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}