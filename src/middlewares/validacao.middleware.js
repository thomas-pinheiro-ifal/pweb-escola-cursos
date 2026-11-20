const NIVEIS = ["BASICO", "INTERMEDIARIO", "AVANCADO"];

export function validarCurso(req, res, next) {
  // Tiramos os campos do corpo. (req.body existe porque há express.json() no server.)
  const { nome, cargaHoraria, nivel, preco, ativo } = req.body;
  // Juntamos TODOS os erros numa lista — é melhor UX avisar tudo de uma vez.
  const erros = [];
  // nome: texto de 3 a 80 caracteres (trim p/ não aceitar só espaços).
  if (
    typeof nome !== "string" ||
    nome.trim().length < 3 ||
    nome.trim().length > 80
  ) {
    erros.push("nome deve ser texto de 3 a 80 caracteres");
  }
  // cargaHoraria: INTEIRO entre 20 e 400.
  if (
    !Number.isInteger(cargaHoraria) ||
    cargaHoraria < 20 ||
    cargaHoraria > 400
  ) {
    erros.push("cargaHoraria deve ser um inteiro entre 20 e 400");
  }
  // nivel: tem de estar no enum.
  if (!NIVEIS.includes(nivel)) {
    erros.push(`nivel deve ser um de: ${NIVEIS.join(", ")}`);
  }
  // preco: número >= 0 (0 é permitido na ENTRADA; "ativo com preço 0" é REGRA, vem no E5).
  if (typeof preco !== "number" || Number.isNaN(preco) || preco < 0) {
    erros.push("preco deve ser um número maior ou igual a 0");
  }
  // ativo: booleano de verdade (true/false), não a string "true".
  if (typeof ativo !== "boolean") {
    erros.push("ativo deve ser true ou false");
  }
  // Tem erro? Barra aqui com 400 e a lista. O handler nem é chamado.
  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }
  next();
}
