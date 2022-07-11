import "./App.css";
import TaskListComponent from "./components/container/TaskList";
import LoginForm from "./components/pure/forms/LoginForm";
import RegisterForm from "./components/pure/forms/RegisterForm";

function App() {
    return (
        <div className="App">
            {/* <LoginForm /> */}
            {/* <RegisterForm /> */}
            <TaskListComponent />
        </div>
    );
}

export default App;
