import { Platform } from "react-native";

const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT;

const LOCAL_URL =
  Platform.OS === "web"
    ? process.env.EXPO_PUBLIC_LOCAL_URL_WEB
    : Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_LOCAL_URL_IOS
      : process.env.EXPO_PUBLIC_LOCAL_URL_ANDROID;

export const BaseAddress =
  ENVIRONMENT === "DEVELOPMENT"
    ? LOCAL_URL
    : process.env.EXPO_PUBLIC_PUBLIC_URL;

export const Protocol = ENVIRONMENT === "DEVELOPMENT" ? "http" : "https";

export const SocketProtocol = ENVIRONMENT === "DEVELOPMENT" ? "ws" : "wss";

// console.log("Environment: ", ENVIRONMENT);
// console.log("Base Address: ", BaseAddress);
// console.log("Protocol: ", Protocol);
// console.log("Socket Protocol: ", SocketProtocol);
