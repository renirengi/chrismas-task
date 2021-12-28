//import { ConfigLightropeModel } from '../../interfaces';
export { toys } from '../../../toys';

export const rootUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/';

export const trees = [
  'assets/tree/1.png',
  'assets/tree/2.png',
  'assets/tree/3.png',
  'assets/tree/4.png',
  'assets/tree/5.png',
  'assets/tree/6.png',
];

export const backgrounds = [
  'assets/bg/1.jpg',
  'assets/bg/2.jpg',
  'assets/bg/3.jpg',
  'assets/bg/4.jpg',
  'assets/bg/5.jpg',
  'assets/bg/6.jpg',
  'assets/bg/7.jpg',
  'assets/bg/8.jpg',
  'assets/bg/9.jpg',
  'assets/bg/10.jpg',
];


export const getToyImageUrl = (index: number | string) => {
  return `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/${+index + 1}.png`;
};
