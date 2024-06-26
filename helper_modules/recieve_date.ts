export function getDate(day_after_today:number) {
    let today = new Date();
   // Extract the day, month, and year
    today.setDate(today.getDate() + day_after_today);
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let year = today.getFullYear();

// Format the date as dd.mm.yyyy
    let formattedDate = `${day}.${month}.${year}`;
    return formattedDate
  }


  export function getTime(hours: number, minutes: number): string {
    // Ensure hours and minutes are in the correct range (0-23 for hours, 0-59 for minutes)
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}`;
}

  