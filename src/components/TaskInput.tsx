import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle } from 'lucide-react';
import { addTask } from '../store/taskSlice';


const TaskInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTask(input.trim()));
      setInput('');
      
      // Create and animate a small plus icon that flies up and fades out
      const plusIcon = document.createElement('div');
      plusIcon.innerHTML = '✓';
      plusIcon.className = 'fixed text-green-500 text-xl animate-fade-up'; // You can style this class in your CSS
      plusIcon.style.left = `${e.currentTarget.getBoundingClientRect().left + 20}px`;
      plusIcon.style.top = `${e.currentTarget.getBoundingClientRect().top - 20}px`;
      document.body.appendChild(plusIcon);
      
      setTimeout(() => plusIcon.remove(), 1000);
    }
  };

  return (
    <div className="task-input-container">
      <form 
        onSubmit={handleSubmit} 
        className="task-input-form"
      >
        <h2 className="task-input-header">Add a New Task</h2>
        <div className="input-button-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your task..."
            className="task-input"
          />
          <button
            type="submit"
            className="submit-button"
            disabled={!input.trim()}
          >
            <span>Add</span>
            <PlusCircle className="plus-icon" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
