import {  useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./AuthContext";
import TodoList from "./components/TodoList";
import './App.css'
import Login from "./components/Login";
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
//import tasksData from "./data/tasks.json";
import { useDispatch, useSelector } from "react-redux";
import { addTasks } from "./reducers/taskSlice";

function App() {
  //const [tasks, setTasks] = useState(tasksData);
  const tasks = useSelector((state)=>state.tasks)
  const dispatch=useDispatch()

  const defaultTask = {
    title: "",
    id: null,
    description: "",
    deadline: null,
    tags: [],
    priority: false,
    image: "",
    completed: false,
    createdAt: null
  };

  //Commented below 3 Functions for Redux
  /* const onCreate = newTask => {
    newTask.title.length > 0 && setTasks([newTask, ...tasks]);
  };

  const onUpdate = (task, id) => {
    let tempList = tasks;
    let index = tasks.findIndex(t => t.id === id);
    tempList[index] = task;
    setTasks([...tempList]);
  };
  const onDelete = (id) => {
    let tempList = tasks.filter(task => task.id !== id);
    setTasks(tempList);
  }; */

  useEffect(() => {
    let arr = localStorage.getItem("tasks");
    if (arr) {
      //setTasks(JSON.parse(arr));
      dispatch(addTasks(JSON.parse(arr)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);


  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <TodoList tasks={tasks} defaultTask={defaultTask} />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
