import { z } from "zod";
import {
  ConfessionsSchema,
  FollowersSchema,
  FriendsSchema,
  ReportsSchema,
  UserSchema,
} from "./base-schema";

export const UserLiteSchema = z
  .object({
    id: z.string().optional(),
    avatar: z.string().nullable().optional(),
    firstName: z.string().nullable().optional(),
    lastName: z.string().nullable().optional(),
    username: z.string().nullable().optional(),
    anonymous: z.boolean().nullable().optional(),
  })
  .catchall(z.unknown());

export const ReplyWithUserSchema = z.object({
  id: z.string(),
  confessionId: z.string(),
  message: z.string(),
  createdAt: z.string(),
  user: z.union([UserSchema, UserLiteSchema]).nullable(),
});

export const ActualConfessionWithToAndFromSchema = z.object({
  confession: ConfessionsSchema,
  confessedFromUser: z.union([UserSchema, UserLiteSchema]).nullable(),
  confessedToUser: z.union([UserSchema, UserLiteSchema]).nullable(),
  replies: z.array(ReplyWithUserSchema),
  reports: z.array(ReportsSchema),
  currentUserLiked: z.boolean(),
});

export const GetMyConfessionPostsResponseSchema = z.array(
  ActualConfessionWithToAndFromSchema,
);

export const UserFriendsItemSchema = z.object({
  friends: FriendsSchema,
  user: UserSchema,
});

export const GetUserFriendsResponseSchema = z.union([
  z.object({
    success: z.literal(false),
    message: z.string(),
  }),
  z.object({
    success: z.literal(true),
    message: z.string(),
    friends: z.array(UserFriendsItemSchema),
  }),
]);

export const UserFollowersItemSchema = z.object({
  followers: FollowersSchema,
  user: UserSchema,
});

export const GetUserFollowersResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  followers: z.array(UserFollowersItemSchema),
});

export const UserFollowingsItemSchema = z.object({
  following: FollowersSchema,
  user: UserSchema,
});

export const GetUserFollowingsResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  followings: z.array(UserFollowingsItemSchema),
});

export const ProfilePageLoadSchema = z.object({
  allConfessions: GetMyConfessionPostsResponseSchema,
  allFriends: z.array(UserFriendsItemSchema),
  followers: z.array(UserFollowersItemSchema),
  following: z.array(UserFollowingsItemSchema),
});
