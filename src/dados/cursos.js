// src/dados/cursos.js — dados de exemplo (por enquanto, uma lista fixa em memória).
// "export const" = EXPORT NOMEADO: quem importar tem de usar o mesmo nome { cursos }.
// Repare que cada curso já tem campos "de verdade" (nivel é um enum; preco é número),
// que vão exigir VALIDAÇÃO no próximo encontro.
export const cursos = [
  { id: 1, nome: "Lógica de Programação", cargaHoraria: 60, nivel: "BASICO",
    preco: 0, ativo: true },
  { id: 2, nome: "Desenvolvimento Web", cargaHoraria: 120, nivel: "INTERMEDIARIO",
    preco: 450.0, ativo: true },
  { id: 3, nome: "Arquitetura de Software", cargaHoraria: 80, nivel: "AVANCADO",
    preco: 600.0, ativo: false },
];