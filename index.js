import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { Resend } from "resend";

dotenv.config();
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

app.post("/mail", async (req, res) => {
  console.log(req.body);
  const forwardEmail = "kirk@arroyastudio.com";
  const { data, error } = await resend.emails.send({
    from: "Ivy Level Speaking Contact Form <contact@ivylevelspeaking.com>",
    to: [forwardEmail],
    reply_to: req.body.email,
    subject: `${req.body.name} - Ivy Level Speaking Inquiry`,
    html: `<p>New inquiry from ${req.body.name}</p>`,
  });
  if (error) {
    return res.status(400).json({ error });
  }
  console.log(
    `Inquiry from ${req.body.name} has been forwarded to ${forwardEmail}`
  );
  res.status(200).json({ data });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`)
);
