import express from "express";
import { UserModel } from "../models/User";

const leaderboardRouter = express.Router();

/**
 * @route GET /leaderboard
 * @returns {Array} - Array of User objects
 * @note Adds the virtual field of totalExperience to the user.
 * @hint You might want to use a similar aggregate in your leaderboard code.
 */
leaderboardRouter.get("/", async (_, res) => {
  const result = await UserModel.aggregate([
    {
      $addFields: {
        objectIdCommunityId: {
          $toObjectId: "$communityid",
        },
      },
    },
    {
      $lookup: {
        from: "communities", // Update with the actual collection name for CommunityModel
        localField: "objectIdCommunityId",
        foreignField: "_id",
        as: "community",
      },
    },
    {
      $unwind: "$community",
    },
    {
      $group: {
        _id: "$community._id",
        name: { $first: "$community.name" },
        logo: { $first: "$community.logo" },
        totalExperience: { $sum: { $sum: "$experiencePoints.points" } },
        totalUsers: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        logo: 1,
        totalExperience: 1,
        totalUsers: 1,
      },
    },
  ]);
  res.send(result);
});

export { leaderboardRouter };
