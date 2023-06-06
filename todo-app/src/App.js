import React, { useState, useEffect } from 'react';
import { markAsCompleted, markAsUncompleted } from 'pokkes-npm-package-utils';
import fetchData from 'pokkes-npm-package';
import './App.css';

function App() {
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    );
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (!todos.length) {
            fetchData('https://jsonplaceholder.typicode.com/todos').then(
                (chunks) => {
                    setTodos(chunks);
                    localStorage.setItem('todos', JSON.stringify(chunks));
                }
            );
        }
    }, [todos]);

    const next = () => {
        setPage(page + 1);
    };

    const prev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

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
            <div className="buttons">
                <button className="button" onClick={prev} disabled={page === 0}>
                    Prev
                </button>
                <button
                    className="button"
                    onClick={next}
                    disabled={page === todos.length - 1}
                >
                    Next
                </button>
            </div>
            <ul className="todo-list">
                {todos[page]?.map((todo) => (
                    <li
                        className={`todo-item ${
                            todo.completed ? 'completed' : ''
                        }`}
                        key={todo.id}
                    >
                        {todo.title}
                        <button onClick={() => handleCompleted(todo)}>
                            Mark as completed
                        </button>
                        <button onClick={() => handleUncompleted(todo)}>
                            Mark as uncompleted
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
