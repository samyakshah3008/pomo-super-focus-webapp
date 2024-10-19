import {
  themeBgColors,
  themeBorders,
  themeColors,
} from "@/app/super-focus/constants";

function getColorClass(themeColor: string) {
  const colorClass = themeColors[themeColor] || themeColors["emerald"];
  return colorClass;
}

function getBgColorClass(themeColor: string) {
  const bgColorClass = themeBgColors[themeColor] || themeBgColors["emerald"];
  return bgColorClass;
}

function getBorderClass(themeColor: string) {
  const borderClass = themeBorders[themeColor] || themeBorders["emerald"];
  return borderClass;
}

export { getBgColorClass, getBorderClass, getColorClass };
