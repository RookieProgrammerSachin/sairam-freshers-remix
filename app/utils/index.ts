export const wait = async (time: number) =>
  await new Promise((res) => setTimeout(res, time));
