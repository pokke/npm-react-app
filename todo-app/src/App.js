import React, { useState, useEffect } from 'react';
import { markAsCompleted, markAsUncompleted } from 'pokkes-npm-package-utils';
import fetchData from 'pokkes-npm-package';
import './App.css';

function App() {
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    );

    useEffect(() => {
        if (!todos.length) {
            fetchData('https://jsonplaceholder.typicode.com/todos').then(
                (chunks) => {
                    setTodos(chunks);
                    localStorage.setItem('todos', JSON.stringify(chunks));
                }
            );
        }
    }, []);

    const handleCompleted = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? markAsCompleted(t) : t
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const handleUncompleted = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? markAsUncompleted(t) : t
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <div className="App">
            <h1 className="title">Todo List Example</h1>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li
                        className={`todo-item ${
                            todo.completed ? 'completed' : ''
                        }`}
                        key={todo.id}
                    >
                        {todo.title}
                        <button onClick={() => handleCompleted(todo)}>
                            Done
                        </button>
                        <button onClick={() => handleUncompleted(todo)}>
                            Undo
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
