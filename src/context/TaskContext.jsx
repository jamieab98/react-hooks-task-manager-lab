import React, { createContext, useId, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const nameId = useId()

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

    function addTask(title) {
        fetch(`http://localhost:6001/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "completed": false
            })
        })
        .then((response) => response.json())
        .then((newTask) => {
            setTasks(prev => [...prev, newTask]);
        });
    }

    return (
        <TaskContext.Provider value={{tasks, setTasks, toggleComplete, addTask}}>
            {children}
        </TaskContext.Provider>
    );
}