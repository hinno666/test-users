import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { customFetch } from "../../../../utils/utils"

export const UserInfo = () => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await customFetch.get(`/users?id=${id}`);
                const data = response.data;
                setUser(data);
            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }

        getUser()
    }, [id])

    return (
        <div className="dashboard__user user">
            {user.map((item) => {
                const { username, id, email } = item;
                return <div className="dashboard__user-info" key={id}>
                    <div className="dashboard__user-img">
                        <img src="" alt="123" />
                    </div>
                    <div className="dashboard__user-about">
                        <div className="dashboard__user-contacts">
                            <p className="dashboard__title dashboard__user-title">
                                {username}
                            </p>
                        </div>
                        <div className="dashboard__user-description">
                            <p className="dashboard__title dashboard__user-title">
                                О себе:
                            </p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}