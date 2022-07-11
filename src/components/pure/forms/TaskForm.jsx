import { useRef } from "react";
import PropTypes from "prop-types";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Task } from "../../../models/task.class";
import { LEVELS } from "../../../models/levels.enum";

function TaskForm({ add, tasksLength }) {
    const validationSchema = yup.object({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        level: yup
            .string()
            .oneOf(
                [LEVELS.NORMAL, LEVELS.URGENT, LEVELS.BLOCKING],
                "You must select a level: Normal, Urgent or Blocking"
            )
            .required("Level is required"),
    });

    const initialValues = {
        name: "",
        description: "",
        level: LEVELS.NORMAL,
    };

    const addTask = (values) => {
        const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
        );
        add(newTask);

        values.name = "";
        values.description = "";
        values.level = LEVELS.NORMAL;
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        addTask(values);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    isSubmitting,
                    handleChange,
                    handleBlurt,
                }) => (
                    <Form>
                        <div>
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name"
                                autoComplete="off"
                            />
                            {errors.name && touched.name && (
                                <ErrorMessage name="name" component="div" />
                            )}
                        </div>
                        <div>
                            <Field
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Description"
                                autoComplete="off"
                            />
                            {errors.description && touched.description && (
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                />
                            )}
                        </div>

                        <div>
                            <Field as="select" id="level" name="level">
                                <option value={LEVELS.NORMAL}>Normal</option>
                                <option value={LEVELS.URGENT}>Urgent</option>
                                <option value={LEVELS.BLOCKING}>
                                    Blocking
                                </option>
                            </Field>
                            {errors.level && touched.level && (
                                <ErrorMessage name="level" component="div" />
                            )}
                        </div>
                        <div>
                            {isSubmitting ? (
                                <p>Adding task...</p>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn btn-success btn-sm"
                                >
                                    {tasksLength === 0
                                        ? "Add Your First Task"
                                        : "Add New Task"}
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

TaskForm.propTypes = {
    add: PropTypes.func.isRequired,
    tasksLength: PropTypes.number.isRequired,
};

export default TaskForm;
