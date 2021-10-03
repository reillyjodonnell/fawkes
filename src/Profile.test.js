const { profiler } = require("./Profiler");

test("the data is a promise containing an object with the user information in it", async () => {
  const data = await profiler;
  expect(data).toBe(undefined);
});
