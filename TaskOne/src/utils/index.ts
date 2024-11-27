export function getInitials(fullName: string): string {
  const names = fullName.trim().split(' ');
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join('');
  return initials;
}
export const PROTOTYPES = {
  "high": "text-red-500",
  "medium": "text-yellow-500",
  "normal": "text-blue-500",
}
export const TASK_TYPES = {
  "todo": "bg-blue-500",
  "in-progress": "bg-yellow-500",
  "completed": "bg-green-500",
}
export const BGS = [
  "bg-blue-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-red-500"
]

export const formatDateCustom = (date: Date): string => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export function dateFormatter(dateString: Date): string {
  const inputDate = new Date(dateString);
  
  // Check if the date is invalid
  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  // Get year, month, and day
  const year = inputDate.getFullYear(); // Corrected from getFu11Year
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Corrected from getmonth
  const day = String(inputDate.getDate()).padStart(2, "0");

  // Format the date as DD-MM-YYYY
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}