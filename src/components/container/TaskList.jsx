import React, { useState } from "react";
import { LEVELS } from "../../models/levels.enum";
import { Task } from "../../models/task.class";
import TaskForm from "../pure/forms/TaskForm";
import TaskComponent from "../pure/Task";

function TaskListComponent() {
    const defaultTask1 = new Task(
        "Carlos1",
        "Carlos is a cool guy1",
        true,
        LEVELS.NORMAL
    );
    const defaultTask2 = new Task(
        "Carlos2",
        "Carlos is a cool guy2",
        false,
        LEVELS.URGENTE
    );
    const defaultTask3 = new Task(
        "Carlos3",
        "Carlos is a cool guy3",
        false,
        LEVELS.BLOCKING
    );

    const [tasks, setTasks] = useState([
        defaultTask1,
        defaultTask2,
        defaultTask3,
    ]);
    const [loading, setLoading] = useState(false);

    const completedTask = (task) => {
        const newTasks = [...tasks];
        const index = newTasks.indexOf(task);
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    const deleteTask = (task) => {
        const newTasks = [...tasks];
        const index = newTasks.indexOf(task);
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    return (
        <div>
            <div className="col-12">
                <div className="card">
                    <div className="card-header p-3">
                        <h5>Your Tasks</h5>
                    </div>
                    <div
                        className="card-body"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "400px" }}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, idx) => {
                                    return (
                                        <TaskComponent key={idx} task={task} completedTask={completedTask} deleteTask={deleteTask} />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <TaskForm/>
                </div>
            </div>
        </div>
    );
}

export default TaskListComponent;
