import React, { useState } from "react";

import TaskComponent from "../pure/Task";
import TaskForm from "../pure/forms/TaskForm";
import { Task } from "../../models/task.class";
import { LEVELS } from "../../models/levels.enum";
import { useEffect } from "react";

function TaskListComponent() {
    const defaultTask1 = new Task(
        "Task 1",
        "Description 1",
        true,
        LEVELS.NORMAL
    );
    const defaultTask2 = new Task(
        "task 2",
        "Description 2",
        false,
        LEVELS.URGENT
    );
    const defaultTask3 = new Task(
        "task 3",
        "Description 3",
        false,
        LEVELS.BLOCKING
    );

    const [tasks, setTasks] = useState([
        defaultTask1,
        defaultTask2,
        defaultTask3,
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const completedTask = (task) => {
        const newTasks = [...tasks];
        const index = newTasks.indexOf(task);
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (task) => {
        const newTasks = [...tasks];
        const index = newTasks.indexOf(task);
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    const addTask = (task) => {
        const tempTasks = [...tasks];
        tempTasks.push(task);
        setTasks(tempTasks);
    };

    let TableTask = () => {
        return (
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
                            <TaskComponent
                                key={idx}
                                task={task}
                                completedTask={completedTask}
                                deleteTask={deleteTask}
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <div className="col-12 hv-75">
                <div className="card">
                    <div className="card-header p-3">
                        <h5>Your Tasks</h5>
                    </div>
                    <div
                        className="card-body"
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: "relative", height: "400px" }}
                    >
                        {tasks.length > 0 ? (
                            loading ? (
                                <p>Loading...</p>
                            ) : (
                                <TableTask />
                            )
                        ) : (
                            <div>
                                <h3>No task</h3>
                                <h4>Please, add one.</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <TaskForm add={addTask} tasksLength={tasks.length} />
        </div>
    );
}

export default TaskListComponent;
