export const wait = async (time: number) =>
  await new Promise((res) => setTimeout(res, time));

export const currentYear = new Date().getFullYear()