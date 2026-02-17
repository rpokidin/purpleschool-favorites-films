export const textCapitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDateOnly = (isoString: string): string => {
  if (!isoString) return '';
  return isoString.split('T')[0];
};

export const formatArray = (genres: { name: string }[] | null | undefined): string => {
  if (!genres || genres.length === 0) {
    return 'Жанры не указаны';
  }
  return genres.map(genre => genre.name).join(', ');
};