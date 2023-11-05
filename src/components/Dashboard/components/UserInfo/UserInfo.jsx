import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { customFetch } from "../../../../utils/utils"
import { UserInfoItem } from "./UserInfoItem"

export const UserInfo = () => {
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            (async () => {
                try {
                    const response = await customFetch.get(`/users?id=${id}`);
                    const data = response.data;
                    setUser(data);
                } catch (error) {
                    setIsError(true)
                } finally {
                    setIsLoading(false)
                }
            })()
        }
    }, [id])


    return (
        <div className="dashboard__user user">
            <UserInfoItem user={user} loading={isLoading} error={isError} />
        </div>
    )
}