//backend index.js
import express from "express"
import rootRouter from "./routes/index.js"
import cors from "cors"
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/v1",rootRouter);

app.listen(3000,() => {console.log("Hello")});
