import { User } from '../models/user.models.js';
import { asyncHandler } from '../utils/async-handler.js';
import { APIError } from '../utils/api-error.js';
import { ProjectMember } from '../models/projectmember.models.js';
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';


export const verifyJWT = asyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token){
        throw new APIError(401, "Unauthorized request.");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refershToken -emailVerificationToken -emailVerificationExpiry"
        );

        if (!user){
            throw new APIError(401, "Invalid access token.");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new APIError(401, "Invalid access token.");
    }
});

export const validateProjectPermission = (roles = []) => 
    asyncHandler(async (req, res, next) => {
        const {projectId} = req.params;
        
        if (!projectId){
            throw new APIError(400, "Project ID is missing.");
        }

        const project = await ProjectMember.findOne(
            {
                project: new mongoose.Types.ObjectId(projectId),
                user: new mongoose.Types.ObjectId(req.user._id),
            }
        );

        if (!project){
            throw new APIError(400, "Project not found.");
        }

        const givenRole = project?.role;

        req.user.role = givenRole;

        if (!roles.includes(givenRole)){
            throw new APIError(403, "You do not have permission to perform this action.");
        }

        next();
    });