export const initialState = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "January 2023",
    completedCourses: 12,
    ongoingCourses: 3,
    totalLessons: 120,
    lessonsCompleted: 95,
    lastOnline: "February 10, 2026",
    currentStatus: "Active",
    role: "Student",
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

export function reducer(state, action){
    switch (action) {
        
    }
}
