import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { Loader2, AlertCircle, CheckCircle2, Clock, List } from 'lucide-react';

const TaskList = () => {
  const { tasks, filter, loading, error } = useSelector((state: RootState) => state.tasks);

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="task-list-container loading">
        <Loader2 className="icon-large animate-spin" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list-container error">
        <AlertCircle className="icon-large" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-filter">
        <div className="task-filter-icon">
          {filter === 'completed' && <CheckCircle2 className="text-green-500" />}
          {filter === 'pending' && <Clock className="text-yellow-500" />}
          {filter === 'all' && <List className="text-blue-500" />}
        </div>
        <span>{filter} Tasks ({filteredTasks.length})</span>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <List className="icon-large" />
            <p>No {filter} tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task: Task, index: number) => (
            <div key={task.id} className="task-item" style={{ animationDelay: `${index * 100}ms` }}>
              <TaskItem task={task} />
            </div>
          ))
        )}
      </div>

      <div className="task-summary">
        Total: {tasks.length} • Completed: {tasks.filter((t) => t.completed).length} • 
        Pending: {tasks.filter((t) => !t.completed).length}
      </div>
    </div>
  );
};

export default TaskList;
