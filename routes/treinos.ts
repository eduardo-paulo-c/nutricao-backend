import { Router, Request, Response, RequestHandler } from "express";
import db from "../database";

const router = Router();

// GET treinos
router.get("/", ((req: Request, res: Response) => {
  const rows = db.prepare("SELECT * FROM treinos ORDER BY data DESC").all();
  res.json(rows);
}) as RequestHandler);

// POST treino
router.post("/", ((req: Request, res: Response) => {
  const { data, tipo } = req.body;
  if (!data || !["A", "B", "C"].includes(tipo)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }
  db.prepare("INSERT INTO treinos (data, tipo) VALUES (?, ?)").run(data, tipo);
  res.status(201).json({ message: "Treino salvo" });
}) as RequestHandler);

// DELETE treino por data
router.delete("/:data", ((req: Request, res: Response) => {
  const { data } = req.params;

  const stmt = db.prepare("DELETE FROM treinos WHERE data = ?");
  const result = stmt.run(data);

  if (result.changes > 0) {
    res.status(200).json({ message: "Treino removido" });
  } else {
    res.status(404).json({ error: "Treino não encontrado" });
  }
}) as RequestHandler);

export default router;
