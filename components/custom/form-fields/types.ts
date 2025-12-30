import { MediaType } from "expo-image-picker";

export type MediaValue = {
  uri: string;
  type: MediaType;
  name?: string | null;
  size?: number;
};
