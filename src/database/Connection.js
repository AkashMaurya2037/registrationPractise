const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`)
  .then(() => {
    console.log("Connected with MongoDB.");
  })
  .catch((err) => {
    console.log(`Failed to Connect.` + err ? "" : err);
  });
