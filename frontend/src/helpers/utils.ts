import { QUIZE_TIME } from "../constants";

export const getCurrentTime = () => {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

function parseTimeToSeconds(dateString: string) {
  const timeString = dateString.split(",")[1].trim()?.split(" ")[0];
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export function getTimeDifference(startTime: string, endTime: string) {
  const startInSeconds = parseTimeToSeconds(startTime);
  const endInSeconds = parseTimeToSeconds(endTime);
  let diffInSeconds = endInSeconds - startInSeconds;
  const hours = Math.floor(diffInSeconds / 3600);
  diffInSeconds -= hours * 3600;
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds - minutes * 60;
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export const getTimePercentage = (timeTaken: string) => {
  const [hours, minutes, seconds] = timeTaken.split(":").map(Number);
  const timeTakenInSecs = hours * 3600 + minutes * 60 + seconds;
  return (timeTakenInSecs / (QUIZE_TIME * 60)) * 100;
};

export const checkPropertiesExist = (obj: any, properties: string[]) => {
  return properties.every((prop) => !(prop in obj));
};
