import React from "react";
import "../../styles/task.scss";
import PropTypes from "prop-types";
import { Task } from "../../models/task.class";
import { LEVELS } from "../../models/levels.enum";

function TaskComponent({ task, completedTask, deleteTask }) {
    const taskLevelBadge = () => {
        switch (task.level) {
            case LEVELS.NORMAL:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-primary">{task.level}</span>
                    </h6>
                );
            case LEVELS.URGENT:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-warning">{task.level}</span>
                    </h6>
                );
            case LEVELS.BLOCKING:
                return (
                    <h6 className="mb-0">
                        <span className="badge bg-danger">{task.level}</span>
                    </h6>
                );
            default:
                break;
        }
    };

    const taskCompletedIcon = () => {
        if (task.completed) {
            return (
                <i
                    className="bi bi-toggle-on task-action"
                    onClick={() => completedTask(task)}
                    style={{ color: "green" }}
                ></i>
            );
        } else {
            return (
                <i
                    className="bi bi-toggle-off task-action"
                    onClick={() => completedTask(task)}
                    style={{ color: "gray" }}
                ></i>
            );
        }
    };

    let styleCompleted = {
        textDecoration: "line-through",
        color: "gray",
    };

    let styleNotCompleted = {
        color: "tomato",
        fontWeight: "bold",
    };

    return (
        <tr
            className="fw-normal"
            style={task.completed ? styleCompleted : styleNotCompleted}
        >
            <td className="align-middle">
                <span className="ms-2">{task.name}</span>
            </td>
            <td className="align-middle">
                <span>{task.description}</span>
            </td>
            <td className="align-middle">{taskLevelBadge()}</td>
            <td className="align-middle">
                {taskCompletedIcon()}
                <i
                    className="bi bi-trash task-action"
                    onClick={() => deleteTask(task)}
                    style={{ color: "tomato" }}
                ></i>
            </td>
        </tr>
    );
}

TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task).isRequired,
    completedTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TaskComponent;
