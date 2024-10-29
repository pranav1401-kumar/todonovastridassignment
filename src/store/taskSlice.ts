import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import{ FilterType, Task} from '../types'
import{v4 as uuidv4} from 'uuid';

interface TaskState{
    tasks:Task[];
    loading:boolean;
    error:string |null;
    filter :FilterType;
}

const initialState:TaskState={
    tasks:[],
    loading:false,
    error:null,
    filter:'all'


};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    await delay(1000);
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await response.json();
    return data.map((task: any) => ({
      id: uuidv4(),
      title: task.title,
      completed: task.completed,
      createdAt: new Date()
    }));
  }
);

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        id: uuidv4(),
        title: action.payload,
        completed: false,
        createdAt: new Date()
      });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch tasks';
      });
  }
});

export const { addTask, toggleTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
