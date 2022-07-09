import React from "react";
import "../../styles/task.scss";
import PropTypes from "prop-types";
import { Task } from "../../models/task.class";

function TaskComponent({ task }) {
    return (
        <tr className="fw-normal">
            <td className="align-middle">
                <span className="ms-2">{task.name}</span>
            </td>
            <td className="align-middle">
                <span>{task.description}</span>
            </td>
            <td className="align-middle">
                <span>{task.level}</span>
            </td>
            <td className="align-middle">
                <span>{task.completed ? "COMPLETED" : "PENDING"}</span>
            </td>
        </tr>
    );
}

TaskComponent.propTypes = {
    task: PropTypes.instanceOf(Task),
};

export default TaskComponent;
