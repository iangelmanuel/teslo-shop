export const sleep = async (seconds: number) => {
  return await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}
