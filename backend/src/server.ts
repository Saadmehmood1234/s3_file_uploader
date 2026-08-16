import { env } from "./config/env.js";
import app from "./app.js";

const PORT = env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});
