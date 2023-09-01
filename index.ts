import { PORT } from "./config";
import { app } from "./src/app";

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});