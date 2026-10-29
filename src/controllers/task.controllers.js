import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Task } from "../models/task.model.js";
import { Subtask } from "../models/subtask.models.js";
import { APIResponse } from '../utils/api-response.js';
import { APIError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import { AvailableUserRole, UserRolesEnum } from "../utils/constants.js";
import mongoose from "mongoose";

const getTasks = asyncHandler(async (req, res) => {

});

const createTask = asyncHandler(async (req, res) => {
    const { title, description, assignedTo, status } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project){
        throw new APIError(404, "Project not found.");
    }

    const files = req.files || [];

    const attachments = files.map((file) => {
        return {
            url: `${process.env.SERVER_URL}/images/${file.originalname}`,
            mimetype: file.mimetype,
            size: file.size
        }
    });

    const task = await Task.create({
        title: title,
        description: description,
        project: new mongoose.Types.ObjectId(projectId),
        assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
        status: status,
        assignedBy: new mongoose.Types.ObjectId(req.user._id),
        attachments: attachments
    });

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                task,
                "Task created successfully."
            )
        )
});

const getTaskById = asyncHandler(async (req, res) => {

});

const updateTask = asyncHandler(async (req, res) => {

});

const deleteTask = asyncHandler(async (req, res) => {

});

const createSubTask = asyncHandler(async (req, res) => {

});

const updateSubTask = asyncHandler(async (req, res) => {

});

const deleteSubTask = asyncHandler(async (req, res) => {

});

export {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    createSubTask,
    updateSubTask,
    deleteSubTask
};