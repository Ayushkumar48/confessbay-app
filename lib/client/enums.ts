const gender = ["Male", "Female", "Others", "Prefer not to say"] as const;
const friendshipStatus = ["pending", "accepted", "rejected"] as const;
const authProvider = ["google"] as const;
const zodiacSign = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;
const confessionCategory = [
  "Crush",
  "Love Story",
  "Heartbreak",
  "Situationship",
  "Funny Incident",
  "Embarrassing Moment",
  "College Gossip",
  "Classroom Drama",
  "Hostel Life",
  "Events and Fests",
  "Canteen Chronicles",
  "Campus Crush",
  "Friendship Issues",
  "Mental Health",
  "Loneliness",
  "Academic Stress",
  "College Issues",
  "Opinion",
  "Advice",
  "Secret",
  "Apology",
  "Personal Growth",
  "Spicy Confession",
  "Other",
] as const;
const visibility = ["College", "Friends", "Public"] as const;
const reportStatus = ["Pending", "Reviewed", "Removed"] as const;
const notificationType = ["Like", "Reply", "Friend Request", "Report"] as const;
const chatMessageType = ["text", "image", "file", "video", "audio"] as const;
type ChatMessageType = (typeof chatMessageType)[number];

export type { ChatMessageType };

export {
  gender,
  authProvider,
  zodiacSign,
  friendshipStatus,
  confessionCategory,
  visibility,
  reportStatus,
  notificationType,
  chatMessageType,
};
