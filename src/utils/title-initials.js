export default function(title) {
  try {
    return title
      .split(' ')
      .map(word => word[0])
      .map(char => char.toUpperCase())
      .join('')
      .substring(0, 2);
  } catch (error) {
    console.error(error);
    return '🚀';
  }
}
