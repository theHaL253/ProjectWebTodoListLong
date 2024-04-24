// App.js
import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  // Task 1: To-do List
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    if (inputTask.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    if (tasks.some((task) => task.text === inputTask)) {
      setError('Task already exists');
      return;
    }
    setTasks([...tasks, { text: inputTask, completed: false }]);
    setInputTask('');
    setError('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], completed: !updatedTasks[index].completed };
    setTasks(updatedTasks);
  };

  // Task 2: Contact Card using API Calls
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        if (!response.ok) {
          throw new Error('Failed to fetch contact data');
        }
        const data = await response.json();
        setContactInfo(data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact:', error);
        setContactError('Failed to fetch contact data');
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return (
    <div className="container">
      <div className="todo">
        <h1 style={{ color: 'gold' }}>Task 1: TODO List</h1>
        <div className="add-task">
          <input
            type="text"
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        {error && <div className="error">{error}</div>}
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              <span className="task-text">{task.text}</span>
              <div className="actions">
                <button onClick={() => deleteTask(index)}>❌</button>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact">
        <h1 style={{ color: 'gold' }}>Task 2: Contact Card</h1>
        {loading ? (
          <div>Loading...</div>
        ) : contactError ? (
          <div className="error">{contactError}</div>
        ) : (
          contactInfo && (
            <div className="card">
              <div className="contact-info">
                <img src={contactInfo.picture.large} alt="User" />
                <div>
                  <p>Title: {contactInfo.name.title}</p>
                  <p>First Name: {contactInfo.name.first}</p>
                  <p>Last Name: {contactInfo.name.last}</p>
                  <p>Phone: {contactInfo.phone}</p>
                  <p>Email: {contactInfo.email}</p>
                  <p>Age: {contactInfo.dob.age}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
