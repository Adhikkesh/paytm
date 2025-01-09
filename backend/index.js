//backend index.js
import express from "express"
import rootRouter from "./routes/index.js"
import cors from "cors"
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://skar-pay-frontend.onrender.com',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api/v1",rootRouter);

app.listen(PORT,() => {console.log("Hello")});
