import { Message } from "./types";
import moment = require("moment");

export const randomColorArray = () => [
  getRandomInt(0, 255),
  getRandomInt(0, 255),
  getRandomInt(0, 255)
];

export const rgbArrayToString = (rgb: RGB) =>
  `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

type RGB = [number, number, number];

const luminance = (rgb: RGB) => {
  const a = rgb.map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const contrast = (rgb1: RGB, rgb2: RGB) => {
  return (luminance(rgb1) + 0.05) / (luminance(rgb2) + 0.05);
};

export const getUserColors = () => {
  const bg = randomColorArray();
  const front = contrast(bg as RGB, [0, 0, 0]) < 4.5 ? "#fff" : "#000";

  return { bg: rgbArrayToString(bg as RGB), front };
};

export const isObjectEmpty = (obj: {}): boolean =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export const isMessageSameDay = (m: Message, m2: Message): boolean =>
  m &&
  m2 &&
  moment(m.sentAt)
    .utc()
    .isSame(moment(m2.sentAt).utc(), "day");

export const isMessageSameUser = (m: Message, m2: Message): boolean =>
  m && m2 && m.user.id === m2.user.id;
