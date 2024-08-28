import { DateOptionsType } from "../interfaces/auth.interface";

function convertDateFormat(dateString: string) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Define options for formatting the month and day
  const options: DateOptionsType = {
    month: 'long',
    day: 'numeric',
  };

  // Use Intl.DateTimeFormat to format the date
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Format the date and convert it to uppercase
  const formattedDate = formatter.format(date).toUpperCase();

  return formattedDate;
}

export default convertDateFormat;
