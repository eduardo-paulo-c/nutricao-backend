import express from "express";
import cors from "cors";
import treinoRoutes from "./routes/treinos"; // ✅ importa o router

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/treinos", treinoRoutes); // ✅ usa como middleware

app.get("/", (_, res) => {
  res.send("API de Treinos online 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
