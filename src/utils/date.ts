const months: string[] = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

const daysOfWeek: string[] = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
]

export const formatDate = (date: Date, formatFor: string): string => {
  const day: number = date.getDate()
  const month: number = date.getMonth()
  const year: number = date.getFullYear()
  const dayOfWeek: string = daysOfWeek[date.getDay()]

  if (formatFor === 'views') return `${dayOfWeek} ${day} ${months[month]}`
  if (formatFor === 'api')
    return `${year}${(month + 1).toString().padStart(2, '0')}${day
      .toString()
      .padStart(2, '0')}`
}

export const unformatDate = (dateStr: string): string => {
  const year: number = parseInt(dateStr.substring(0, 4))
  const month: number = parseInt(dateStr.substring(4, 6)) - 1
  const day: number = parseInt(dateStr.substring(6, 8))
  const date: Date = new Date(year, month, day)

  const dayOfWeek: string = daysOfWeek[date.getDay()]

  return `${dayOfWeek} ${day} ${months[month]}`
}

// FORMAT RDV FROM API
export const formatApiBookedDate = (
  dateStr: string
): { date: string; hour: string } => {
  // Spread the date & hour string
  const parts: string[] = dateStr.split('|')
  if (parts.length !== 2) {
    throw new Error('Invalid input format')
  }

  // Reorganize the hour
  const hourParts: string[] = parts[1].split(':')
  if (hourParts.length !== 2) {
    throw new Error('Invalid time format')
  }
  const formattedHour: string = hourParts[0] + 'h' + hourParts[1]

  // Return formatted date & hour
  return { date: parts[0], hour: formattedHour }
}

// FORMAT RDV TO SEND API
export const formatApiDate = (dateStr: string, hourStr: string): string => {
  const formattedHour = hourStr.replace('h', ':')
  return `${dateStr}|${formattedHour}`
}
