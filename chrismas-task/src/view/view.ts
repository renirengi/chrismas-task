export const myAsynFunction = async (url: string): Promise<T> => {
  const { data } = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/christmas-task/assets/toys/1.png')
  console.log (data);
  return data;
}


