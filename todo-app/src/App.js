import React, { useState, useEffect } from 'react';
import fetchData from 'pokkes-npm-package';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchData('https://jsonplaceholder.typicode.com/todos').then((data) =>
            setTodos(data.slice(0, 10))
        );
    }, []);

    return (
        <div className="App">
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title} -{' '}
                        {todo.completed ? 'Completed' : 'Incomplete'}
                    </li>
                ))}
            </ul>
        </div>
    );
}
console.log('App.js');
//lots of changes
export default App;
