import { currentUser } from "../../data/mockData.js";

export const initialState = {
    name: currentUser.name,
    email: currentUser.email,
    joined: currentUser.joined,
    lastOnline: currentUser.lastOnline,
    currentStatus: currentUser.currentStatus,
    role: currentUser.role,
    activity: generateWeekdayArrays(2026), // Sample activity data for the Activity Board
}

function generateWeekdayArrays(year) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekdaysArray = daysOfWeek.map(() => []);
  let date = new Date(year, 0, 1);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // first Monday

  while (date.getFullYear() <= year) {
    const weekdayIndex = (date.getDay() + 6) % 7;
    weekdaysArray[weekdayIndex].push({
      date: date.toISOString().split("T")[0],
      day: daysOfWeek[weekdayIndex],
      description: `Activity on ${date.toDateString()}`,
    });
    date.setDate(date.getDate() + 1);
  }
  return weekdaysArray;
}

export const ACTIONS = {
  UPDATE_FIELD: "UPDATE_FIELD",
  RESET: "RESET",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_FIELD:
      return { ...state, [action.field]: action.value };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
}
