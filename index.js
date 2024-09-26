import express from "express";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
