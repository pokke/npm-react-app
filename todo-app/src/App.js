import React, { useState, useEffect } from 'react';
import { markAsCompleted, markAsUncompleted } from 'pokkes-npm-package-utils';
import { removeTodo } from 'pokkes-npm-package-remove';
import './App.css';

function App() {
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    );
    const [newTodo, setNewTodo] = useState('');
    const [page, setPage] = useState(0);
    const todosPerPage = 10;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleCompleted = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? markAsCompleted(t) : t
        );
        setTodos(updatedTodos);
    };

    const handleUncompleted = (todo) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? markAsUncompleted(t) : t
        );
        setTodos(updatedTodos);
    };

    const handleRemove = (todoToRemove) => {
        const updatedTodos = removeTodo(todos, todoToRemove);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const addTodo = () => {
        const todo = {
            id: Date.now(),
            title: newTodo,
            completed: false,
        };
        setTodos([todo, ...todos]);
        setNewTodo('');
    };

    const prevPage = () => {
        setPage(page - 1);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    const todosToShow = todos.slice(
        page * todosPerPage,
        (page + 1) * todosPerPage
    );

    return (
        <div className="App">
            <h1 className="title">Todo List</h1>
            <div className="add-todo-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add new todo"
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul className="todo-list">
                {todosToShow.map((todo) => (
                    <li
                        className={`todo-item ${
                            todo.completed ? 'completed' : ''
                        }`}
                        key={todo.id}
                    >
                        <div className="title-container">{todo.title}</div>
                        <div className="actions-container">
                            {todo.completed ? (
                                <button onClick={() => handleUncompleted(todo)}>
                                    Undo
                                </button>
                            ) : (
                                <button onClick={() => handleCompleted(todo)}>
                                    Done
                                </button>
                            )}
                            <div className="remove-container">
                                <button onClick={() => handleRemove(todo)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination-buttons">
                <button onClick={prevPage} disabled={page === 0}>
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={
                        page >= Math.ceil(todos.length / todosPerPage) - 1
                    }
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
