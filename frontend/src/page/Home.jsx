import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(4); // Number of tasks per page
  const [refresh, setRefresh] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); // Track which task is being edited

  const { isAuthenticated } = useContext(Context);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${server}/tasks/mytask`, {
        withCredentials: true,
      });
      setTasks(response.data.task);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]); // Fetch tasks whenever refresh state changes

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editTaskId) {
        // If editing existing task
        await axios.put(
          `${server}/tasks/update/${editTaskId}`,
          { title, description },
          { withCredentials: true }
        );
        toast.success("Task updated successfully");
      } else {
        // If adding new task
        await axios.post(
          `${server}/tasks/new`,
          { title, description },
          { withCredentials: true }
        );
        toast.success("New task added successfully");
      }
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const editHandle = (id) => {
    // Populate the respective task's title and description for editing
    const taskToEdit = tasks.find((task) => task._id === id);
    setTitle(taskToEdit.title);
    setDescription(taskToEdit.description);
    setEditTaskId(id);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${server}/tasks/${id}`, { withCredentials: true });
      toast.success("Task deleted successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateHandler = async (id) => {
    try {
      await axios.put(
        `${server}/tasks/md/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Task updated successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Pagination logic remains the same as before

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <div style={{ margin: "20px 0" }}>
        <section>
          <form
            onSubmit={submitHandler}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "10px",
                margin: "5px 0",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: "10px",
                margin: "5px 0",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              disabled={loading}
              type="submit"
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
          </form>
        </section>
      </div>

      <section style={{ marginTop: "20px" }}>
        {currentTasks?.map((task) => (
          <TodoItem
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            editHandle={() => editHandle(task._id)} // Pass editHandler to TodoItem
            id={task._id}
            key={task._id}
          />
        ))}
      </section>

      <ul
        style={{ listStyle: "none", display: "flex", justifyContent: "center" }}
      >
        {Array.from(
          { length: Math.ceil(tasks.length / tasksPerPage) },
          (_, index) => (
            <li key={index}>
              <button
                onClick={() => paginate(index + 1)}
                style={{
                  padding: "10px",
                  margin: "5px",
                  backgroundColor: "#007bff",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Home;
