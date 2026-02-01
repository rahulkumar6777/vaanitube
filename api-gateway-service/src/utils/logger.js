export const log = (data) => {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    ...data
  }));
};
