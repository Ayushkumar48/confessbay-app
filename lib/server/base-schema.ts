import { z } from "zod";
import * as enums from "$lib/client/enums";

export const GenderEnumSchema = z.enum(enums.gender);
export const FriendshipStatusEnumSchema = z.enum(enums.friendshipStatus);
export const AuthProviderTypeEnumSchema = z.enum(enums.authProvider);
export const ZodiacSignEnumSchema = z.enum(enums.zodiacSign);
export const ConfessionCategoryEnumSchema = z.enum(enums.confessionCategory);
export const VisibilityEnumSchema = z.enum(enums.visibility);
export const ReportStatusEnumSchema = z.enum(enums.reportStatus);
export const NotificationTypeEnumSchema = z.enum(enums.notificationType);
export const ChatMessageTypeEnumSchema = z.enum(enums.chatMessageType);

export const CollegesSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
});

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string().nullable(),
  gender: GenderEnumSchema,
  authProvider: AuthProviderTypeEnumSchema.nullable(),
  authProviderId: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  avatar: z.string(),
  collegeId: z.string().nullable(),
  collegeEmail: z.string().nullable(),
  emailVerified: z.boolean(),
  phoneVerified: z.boolean(),
  zodiacSign: ZodiacSignEnumSchema.nullable(),
  openToRelationships: z.boolean(),
  totalConfessions: z.number().int(),
  city: z.string().nullable(),
  bio: z.string().nullable(),
  anonymous: z.boolean(),
  password: z.string().nullable(),
  lastSeenAt: z.string(),
  createdAt: z.string(),
});

export const SessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.string(),
});

export const FriendsSchema = z.object({
  id: z.string(),
  userId1: z.string(),
  userId2: z.string(),
  requestedBy: z.string(),
  status: FriendshipStatusEnumSchema,
  acceptedAt: z.string().nullable(),
  createdAt: z.string(),
});

export const ConfessionsSchema = z.object({
  id: z.string(),
  confessedFrom: z.string(),
  confessedTo: z.string().nullable(),
  message: z.string(),
  likes: z.number().int(),
  isAnonymous: z.boolean(),
  category: ConfessionCategoryEnumSchema,
  reportCount: z.number().int(),
  visibility: VisibilityEnumSchema,
  repliesEnabled: z.boolean(),
  createdAt: z.string(),
  lastUpdatedAt: z.string(),
});

export const RepliesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  confessionId: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

export const LikesSchema = z.object({
  id: z.string(),
  userId: z.string(),
  confessionId: z.string(),
  createdAt: z.string(),
});

export const ConfessionPicturesSchema = z.object({
  id: z.string(),
  confessionId: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
});

export const ChatsSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  conversationId: z.string(),
  message: z.string().nullable(),
  iv: z.string().nullable(),
  authTag: z.string().nullable(),
  chatMessageType: ChatMessageTypeEnumSchema,
  mediaUrl: z.string().nullable(),
  deliveredAt: z.string(),
  readAt: z.string().nullable(),
  repliedTo: z.string().nullable(),
  isDeletedBySender: z.boolean(),
  isDeletedByReceiver: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ConversationsSchema = z.object({
  id: z.string(),
  userId1: z.string(),
  userId2: z.string(),
  lastMessageId: z.string().nullable(),
  unreadCountForUser1: z.number().int(),
  unreadCountForUser2: z.number().int(),
  isArchivedByUser1: z.boolean(),
  isArchivedByUser2: z.boolean(),
  isMutedByUser1: z.boolean(),
  isMutedByUser2: z.boolean(),
  isBlockedByUser1: z.boolean(),
  isBlockedByUser2: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ReportsSchema = z.object({
  id: z.string(),
  reportedBy: z.string(),
  confessionId: z.string(),
  reason: z.string(),
  status: ReportStatusEnumSchema.nullable(),
  createdAt: z.string().nullable(),
});

export const BlockedUsersSchema = z.object({
  id: z.string(),
  blockedBy: z.string(),
  blockedUser: z.string(),
  createdAt: z.string(),
});

export const CollegeVerificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  verificationCode: z.string().nullable(),
  verified: z.boolean(),
  expiresAt: z.string().nullable(),
});

export const NotificationsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: NotificationTypeEnumSchema,
  entityId: z.string().nullable(),
  message: z.string().nullable(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

export const FollowersSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
  createdAt: z.string(),
});
