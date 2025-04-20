import { Router, Request, Response, RequestHandler } from "express";
import db from "../database";

// Cria uma instância do Router
const router = Router();

// Define a rota GET com tipagem explícita usando RequestHandler
router.get("/", ((req: Request, res: Response) => {
  const rows = db.prepare("SELECT * FROM treinos ORDER BY data DESC").all();
  res.json(rows);
}) as RequestHandler);

// Define a rota POST com tipagem explícita usando RequestHandler
router.post("/", ((req: Request, res: Response) => {
  const { data, tipo } = req.body;
  if (!data || !["A", "B", "C"].includes(tipo)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }
  db.prepare("INSERT INTO treinos (data, tipo) VALUES (?, ?)").run(data, tipo);
  res.status(201).json({ message: "Treino salvo" });
}) as RequestHandler);

// Exporta o router diretamente
export default router;
