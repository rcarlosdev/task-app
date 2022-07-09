import React from "react";
import { LEVELS } from "../../models/levels.enum";
import { Task } from "../../models/task.class";
import TaskComponent from "../pure/Task";

function TaskListComponent() {
    const defaultTask = new Task(
        "Carlos",
        "Carlos is a cool guy",
        false,
        LEVELS.NORMAL
    );

    return (
        <div>
            <div className="col-12">
                <div className="card">
                    <div className="card-header p-3">
                        <h5>Your Tasks</h5>
                    </div>
                    <div className="card-body" data-mdb-perfect-scrollbar="true" style={{ position: "relative", height: "400px" }} >
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
                                <TaskComponent task={defaultTask} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskListComponent;
