const getTime = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  return { hours, minutes };
};

const getDate = () => {
  const today = new Date();

  // Extracting the day of the month
  const dayOfMonth = today.getDate();
  // Extracting the month name
  const monthName = today.toLocaleDateString("en-US", { month: "long" });
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  return { dayOfMonth, monthName, dayName };
};

const isDayTime = (weather) => {
  // Assuming 'weather.datetime' only contains time as "HH:mm:ss"
  // and we're using the current date for the comparison
  const now = new Date();
  const todayDate = now.toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

  // Correctly parsing 'weather.datetime' by including today's date
  const currentTimeString = `${todayDate}T${weather.datetime}`; // Append current time to today's date
  const currentDateTime = new Date(currentTimeString);

  // Building sunrise and sunset Date objects
  const sunriseDateTime = new Date(`${todayDate}T${weather.sunrise}`); // Assuming 'weather.sunrise' is "HH:mm:ss"
  const sunsetDateTime = new Date(`${todayDate}T${weather.sunset}`); // Assuming 'weather.sunset' is "HH:mm:ss"

  //   console.log(
  //     `Current Time: ${currentDateTime}, Sunrise: ${sunriseDateTime}, Sunset: ${sunsetDateTime}`
  //   );

  // Check if the current time is between sunrise and sunset
  return (
    currentDateTime >= sunriseDateTime && currentDateTime <= sunsetDateTime
  );
};
module.exports = { getTime, getDate, isDayTime };
