import './Dashboard.scss'
import { Sidebar } from './components/Sidebar/Sidebar'
import { UserInfo } from './components/UserInfo/UserInfo'

export const Dashboard = () => {
    return (
        <article className="dashboard">
            <Sidebar />
            <UserInfo />
        </article>
    )
}