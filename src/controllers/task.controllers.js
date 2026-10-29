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