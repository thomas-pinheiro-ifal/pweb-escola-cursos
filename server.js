import express from "express";
import { cursos } from "./src/dados/cursos.js";

const app = express();

app.use(express.json());

// Cartão de visita da API.
app.get("/", (req, res) => {
    res.json({ mensagem: "API da Escola de Cursos no ar" });
});

// Lista todos os cursos.
app.get("/cursos", (req, res) => {
    res.json(cursos);
});

// Busca um curso pelo id (404 se não existir).
app.get("/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso) {
        res.status(404).json({ error: "Curso não encontrado" });
    }
    res.json(curso);
});

// Exemplo de requisição: curl --location 'http://localhost:3000/cursos' --header 'Content-Type: application/json' --data '{ "nome": "Banco de Dados", "cargaHoraria": "80", "nivel": "INTERMEDIARIO"}'
app.post("/cursos", (req, res) => {
    const novoCurso = req.body;
    const {nome, cargaHoraria, nivel, preco, ativo} = novoCurso;

    const erros = [];
    if(nome.trim().length <=3 || nome.trim().length >= 80){
        erros.push("O nome do curso deve ser uma string entre 3 e 80 caracteres.");
    }
    if(cargaHoraria <= 20 || cargaHoraria >= 400){
        erros.push("A carga horária deve ser um número positivo entre 20 e 400.");
    }
    if(!["BASICO", "INTERMEDIARIO", "AVANCADO"].includes(nivel)){
        erros.push("O nível do curso deve ser 'BASICO', 'INTERMEDIARIO' ou 'AVANCADO'.");
    }
    if(!Number(preco) || preco < 0){
        erros.push("O preco deve ser um valor válido");
    }
    if(typeof ativo !== "boolean"){
        erros.push("O campo ativo ser igual a true ou false");
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros: erros });
    }
    
    const novo = {
      id: cursos.length ? cursos[cursos.length - 1].id + 1 : 1,
      nome,
      cargaHoraria,
      nivel,
      preco,
      ativo,
    };
    cursos.push(novo);
    res.status(201).json(novoCurso);
});

// Exemplo de requisição: curl --location 'http://localhost:3000/cursos' --header 'Content-Type: application/json' --data '{ "nome": "Banco de Dados", "cargaHoraria": "80", "nivel": "INTERMEDIARIO"}'
app.put("/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso) {
        res.status(404).json({ error: "Curso não encontrado" });
    }


    const atualizaCurso = req.body;
    const {nome, cargaHoraria, nivel, preco, ativo} = atualizaCurso;

    const erros = [];
    if(nome.trim().length <=3 || nome.trim().length >= 80){
        erros.push("O nome do curso deve ser uma string entre 3 e 80 caracteres.");
    }
    if(cargaHoraria <= 20 || cargaHoraria >= 400){
        erros.push("A carga horária deve ser um número positivo entre 20 e 400.");
    }
    if(!["BASICO", "INTERMEDIARIO", "AVANCADO"].includes(nivel)){
        erros.push("O nível do curso deve ser 'BASICO', 'INTERMEDIARIO' ou 'AVANCADO'.");
    }
    if(!Number(preco) || preco < 0){
        erros.push("O preco deve ser um valor válido");
    }
    if(ativo != true && ativo != false){
        erros.push("O campo ativo ser igual a true ou false");
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros: erros });
    }
    curso.nome = nome;
    curso.cargaHoraria = cargaHoraria;
    curso.nivel = nivel;
    curso.preco = preco;
    curso.ativo = ativo;
    cursos.push(curso);
    res.status(201).json(curso);
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
