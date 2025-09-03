import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./src/routes/tasks.routes.js"
import userRoutes from "./src/routes/users.routes.js";
import sequelize from "./src/config/database.js";
import profileRoutes from "./src/routes/profiles.routes.js";
import projectRoutes from "./src/routes/projects.routes.js";
import "./src/models/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/projects", projectRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Base de datos conectada correctamente");
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
});