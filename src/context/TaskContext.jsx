import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    function toggleComplete(task) {
        fetch(`http://localhost:6001/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: !task.completed
            })
        })
        .then((response) => response.json())
        .then((updatedTask) => {
            setTasks(prev => prev.map(t => (t.id == updatedTask.id ? updatedTask : t))
        );
    });
}

    return (
        <TaskContext.Provider value={{tasks, setTasks, toggleComplete}}>
            {children}
        </TaskContext.Provider>
    );
}