async function startApp(app, PORT, maxRetries, dbFn) {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      await dbFn();

      app.listen(PORT, () =>
        console.log(
          `Subscription Tracker API is running on http://localhost:${PORT}!`
        )
      );
      return;
    } catch (error) {
      attempts++;
      console.error(`Connection failed on attempt ${attempts}!`, error.message);

      if (attempts < maxRetries) {
        console.log("Retrying connection in 3 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } else {
        console.warn("Max retries reached! Exiting...");
        process.exit(1);
      }
    }
  }
}

export default startApp;
