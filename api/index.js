import express from "express"
import userRoutes from "./routes/users.js"
import carRoutes from "./routes/cars.js"
import matRoutes from "./routes/mats.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/usuario", userRoutes)
app.use("/carrera",carRoutes)
app.use("/materias",matRoutes)


app.listen(8800)