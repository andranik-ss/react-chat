import * as colors from 'material-ui/colors';

const colorNames = [
  'red',
  'pink',
  'purple',
  'indigo',
  'blue',
  'teal',
  'green',
  'lightGreen',
  'amber',
  'orange',
  'deepOrange',
  'deepPurple',
  'blueGrey'
];

export default function colorFrom(string) {
  try {
    const index = string
      .toString()
      .split('')
      .map(char => char.charCodeAt())
      .reduce((sum, num) => sum + num, 0);

    const colorIndex = index % colorNames.length;
    return colors[colorNames[colorIndex]][500];
  } catch (e) {
    console.error(e);
    return colors['blueGrey'][500];
  }
}
