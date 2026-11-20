import express from "express";
import { cursos } from "./src/dados/cursos.js";
import { validarCurso } from "./src/middlewares/validacao.middleware.js";

const app = express();

app.use(express.json());
app.use(validarCurso);

app.get("/", (req, resp) => {
    resp.send("Ola Mundo!");
});

app.get("/cursos", (req, resp) => {
    resp.json(cursos);
});

app.get("/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso) {
        res.status(404).json({ error: "Curso não encontrado" });
    }
    res.json(curso);
});



app.post("/cursos", (req, res) => {
    const { nome, cargaHoraria, nivel, preco, ativo } = req.body;
    const novo = {
        id: cursos.length ? cursos[cursos.length - 1].id + 1 : 1,
        nome, cargaHoraria, nivel, preco, ativo
    };
    cursos.push(novo);
    res.status(201).json(novo);
});

app.put("/cursos/:id", validarCurso, (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
    } else {
        const { nome, cargaHoraria, nivel, preco, ativo } = req.body;
        curso.nome = nome;
        curso.cargaHoraria = cargaHoraria;
        curso.nivel = nivel;
        curso.preco = preco;
        curso.ativo = ativo;
        res.status(200).json(curso);
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
