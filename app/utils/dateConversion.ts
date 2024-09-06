function dateConversion(dateStr: string) {
  try {
    const date = new Date(dateStr);
    return date.toISOString();
  } catch (error) {
    throw new Error('Invalid date format');
  }
}

export default dateConversion;
