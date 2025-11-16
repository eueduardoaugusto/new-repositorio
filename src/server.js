import { app } from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT);
    console.log(`Is runnig`);
  })
  .catch((err) => {
    console.log(err);
  });
