export function calculateZodiac(dateOfBirth: string): string {
    const birthDate = new Date(dateOfBirth);
    const year = birthDate.getUTCFullYear();
  
    const animals = [
      'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
      'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
    ];
  
    // The cycle starts with Rat at 1924, so we calculate the offset
    const baseYear = 1924;
    const index = (year - baseYear) % 12;
  
    return animals[index];
  }