import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, AppDispatch } from './store/store'; 
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { fetchTasks } from './store/taskSlice';
import { useDispatch } from 'react-redux';

const AppContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="inner-container">
        <h1 className="app-title">
          Task Manager
        </h1>
        <TaskInput />
        <TaskFilters />
        <TaskList />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
