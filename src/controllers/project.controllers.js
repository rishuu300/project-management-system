import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { ProjectMember } from "../models/projectmember.models.js";
import { APIResponse } from '../utils/api-response.js';
import { APIError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import mongoose, { Mongoose } from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";

const getProjects = asyncHandler(async (req, res) => {
    //test
});

const getProjectById = asyncHandler(async (req, res) => {
    //test
});

const createProject = asyncHandler(async (req, res) => {
    const {name, description} = req.body;

    const project = await Project.create(
        {
            name,
            description,
            createBy: new mongoose.Types.ObjectId(req.user._id)
        }
    );

    await ProjectMember.create(
        {
            user: new mongoose.Types.ObjectId(req.user._id),
            project: new mongoose.Types.ObjectId(project._id),
            role: UserRolesEnum.ADMIN
        }
    );

    return res
        .status(201)
        .json(
            new APIResponse(
                201,
                project,
                "Project created successfully."
            )
        )
});

const updateProject = asyncHandler(async (req, res) => {
    const {name, description} = req.body;
    const {projectId} = req.params;

    const project = await Project.findByIdAndUpdate(
        projectId,
        {
            name,
            description,
        },

        {
            new: true
        }
    );

    if (!project){
        throw new APIError(404, "Project not found");
    }

    return res
        .status(200)
        .json(
            new APIResponse(
                200,
                project,
                "Project updated successfully."
            )
        )
});

const deleteProject = asyncHandler(async (req, res) => {
    //test
});

const addMembersToProject = asyncHandler(async (req, res) => {
    //test
});

const getProjectMembers = asyncHandler(async (req, res) => {
    //test
});

const updateMemberRole = asyncHandler(async (req, res) => {
    //test
});

const deleteMember = asyncHandler(async (req, res) => {
    //test
});

export {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    addMembersToProject,
    getProjectMembers,
    updateMemberRole,
    deleteMember
}