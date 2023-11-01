const dateTimeConverter = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";

  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };


  console.log(typeof(month));

  const formattedHour = hour % 12 || 12; 
  const formattedHourString =
    formattedHour < 10 ? `0${formattedHour}` : formattedHour.toString();
  const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();

  const datePart = `${monthMap[month]} ${day}, ${year}`;
  const timePart = `${formattedHourString}:${formattedMinute} ${ampm}`;

  return { date: datePart, time: timePart };
};

export default dateTimeConverter;
