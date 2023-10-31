import { Navbar } from "./components/Navbar/Navbar";
import { Dashboard } from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <div className="application">
      <div className="container">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  )
}

export default App;