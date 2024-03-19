import { Task } from "../modal/task.js";

// create new task api
export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get logged-in user task api
export const getMyTask = async (req, res) => {
  try {
    const userid = req.user._id;

    const task = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update user task api

// update user task api
// update user task api
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Find the task by ID
    const task = await Task.findById(id);

    // If task not found, return 404 error
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid Task Id",
      });
    }

    // Update only the fields that were actually provided...
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    // Save the updated task
    await task.save();

    // Return the updated task details in the response
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      task: task, // Return the updated task object
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Provide more detailed error information
    });
  }
};

export const markAsDone = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid Task Id",
      });
    }

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// delete user task api
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid Task Id",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
