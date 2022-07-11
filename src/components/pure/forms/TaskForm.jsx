import { useRef } from "react";
import PropTypes from "prop-types";
import { Task } from "../../../models/task.class";
import { LEVELS } from "../../../models/levels.enum";

function TaskForm({ add, tasksLength }) {
    const nameRef = useRef("");
    const descriptionRef = useRef("");
    const levelRef = useRef(LEVELS.NORMAL);

    const addTask = (e) => {
        e.preventDefault();
        const newTask = new Task(
            nameRef.current.value,
            descriptionRef.current.value,
            false,
            levelRef.current.value
        );
        add(newTask);

        nameRef.current.value = "";
        descriptionRef.current.value = "";
        levelRef.current.value = LEVELS.NORMAL;
    };

    return (
        <form
            onSubmit={addTask}
            className="d-flex justify-content-center align-items-center"
        >
            <div className="form-outline flex-fill">
                <input
                    type="text"
                    id="inputName"
                    className="form-control form-control-sm"
                    ref={nameRef}
                    placeholder="Name"
                    required
                    autoFocus
                />

                <input
                    type="text"
                    id="inputDescription"
                    className="form-control form-control-sm"
                    placeholder="Description"
                    ref={descriptionRef}
                    required
                />

                <select
                    id="selectLevel"
                    className="form-select form-select-sm"
                    defaultValue={LEVELS.NORMAL}
                    ref={levelRef}
                >
                    <option value={LEVELS.NORMAL}>Normal</option>
                    <option value={LEVELS.URGENT}>Urgent</option>
                    <option value={LEVELS.BLOCKING}>Blocking</option>
                </select>
                <button
                    type="submit"
                    className="btn btn-success btn-sm ms-2    "
                >
                    {tasksLength === 0 ? "Add Your First Task" : "Add New Task"}
                </button>
            </div>
        </form>
    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
    tasksLength: PropTypes.number.isRequired,
};

export default TaskForm;
