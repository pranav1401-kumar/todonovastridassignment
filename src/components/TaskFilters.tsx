import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/taskSlice';
import { RootState } from '../store/store';
import { FilterType } from '../types';
import { ListFilter, CheckCircle2, Clock, LayoutGrid } from 'lucide-react';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const filters: { type: FilterType; icon: React.ReactNode; label: string; count: number }[] = [
    { type: 'all', icon: <LayoutGrid />, label: 'All Tasks', count: tasks.length },
    { type: 'completed', icon: <CheckCircle2 />, label: 'Completed', count: tasks.filter(task => task.completed).length },
    { type: 'pending', icon: <Clock />, label: 'Pending', count: tasks.filter(task => !task.completed).length }
  ];

  return (
    <div className="task-filters-container">
      <div className="task-filters-bg" />

      <div className="task-filters-header">
        <ListFilter />
        <h2>Filter Tasks</h2>
      </div>

      <div className="task-filters-buttons">
        {filters.map(({ type, icon, label, count }) => (
          <button
            key={type}
            onClick={() => dispatch(setFilter(type))}
            className={`filter-button ${currentFilter === type ? 'active' : ''}`}
          >
            {icon}
            <span>{label}</span>
            <span className={`count`}>{count}</span>
            {currentFilter === type && <span className="active-pulse" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;
