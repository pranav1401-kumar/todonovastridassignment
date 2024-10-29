import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../store/taskSlice';
import { Task } from '../types';
import { TrashIcon } from 'lucide-react';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className="task-item">
      <div className="task-title">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleTask(task.id))}
          className="checkbox"
        />
        <span className={task.completed ? 'completed' : ''}>
          {task.title}
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className="delete-button"
      >
        <TrashIcon size={20} />
      </button>
    </div>
  );
};

export default TaskItem;
