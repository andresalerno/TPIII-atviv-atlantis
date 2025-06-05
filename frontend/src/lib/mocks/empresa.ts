export type TipoEmpresa = "hotel" | "pousada" | "resort";
export type TipoAcomodacao = "Solteiro Simples" | "Solteiro Mais" | "Casal Simples" | "Família Simples" | "Família Mais" | "Família Super";

export interface Acomodacao {
  tipo: TipoAcomodacao;
  quantidade: number;
}

export interface Empresa {
  id: number;
  nome: string;
  tipo: TipoEmpresa;
  acomodacoes?: Acomodacao[]; // Campo de acomodações adicionado
}

export interface Reserva {
  clienteId: number;
  empresaId: number;
  tipoAcomodacao: string;
  quantidade: number;
}

export const empresasMock: Empresa[] = [
  {
    id: 1,
    nome: "Hotel Estrela do Mar",
    tipo: "hotel",
    acomodacoes: [
      { tipo: "Solteiro Simples", quantidade: 10 },
      { tipo: "Solteiro Mais", quantidade: 5 },
      { tipo: "Casal Simples", quantidade: 7 },
    ],
  },
  {
    id: 2,
    nome: "Pousada Recanto Feliz",
    tipo: "pousada",
    acomodacoes: [
      { tipo: "Família Simples", quantidade: 8 },
      { tipo: "Família Mais", quantidade: 4 },
      { tipo: "Família Super", quantidade: 2 },
    ],
  },
  {
    id: 3,
    nome: "Resort Paraíso Tropical",
    tipo: "resort",
    acomodacoes: [
      { tipo: "Casal Simples", quantidade: 15 },
      { tipo: "Família Super", quantidade: 10 },
    ],
  },
  {
    id: 4,
    nome: "Hotel Sol Nascente",
    tipo: "hotel",
    acomodacoes: [
      { tipo: "Solteiro Simples", quantidade: 20 },
      { tipo: "Casal Simples", quantidade: 10 },
    ],
  },
  {
    id: 5,
    nome: "Pousada Vila Verde",
    tipo: "pousada",
    acomodacoes: [
      { tipo: "Família Simples", quantidade: 5 },
      { tipo: "Família Mais", quantidade: 3 },
    ],
  },
  {
    id: 6,
    nome: "Resort Atlântico Azul",
    tipo: "resort",
    acomodacoes: [
      { tipo: "Solteiro Mais", quantidade: 8 },
      { tipo: "Família Super", quantidade: 12 },
    ],
  },
  {
    id: 7,
    nome: "Hotel Montanha Serena",
    tipo: "hotel",
    acomodacoes: [
      { tipo: "Solteiro Simples", quantidade: 10 },
      { tipo: "Casal Simples", quantidade: 8 },
      { tipo: "Família Mais", quantidade: 5 },
    ],
  },
  {
    id: 8,
    nome: "Pousada Jardim das Flores",
    tipo: "pousada",
    acomodacoes: [
      { tipo: "Solteiro Mais", quantidade: 7 },
      { tipo: "Família Simples", quantidade: 6 },
    ],
  },
  {
    id: 9,
    nome: "Resort Costa Dourada",
    tipo: "resort",
    acomodacoes: [
      { tipo: "Casal Simples", quantidade: 12 },
      { tipo: "Família Mais", quantidade: 9 },
    ],
  },
  {
    id: 10,
    nome: "Hotel Brisa do Vale",
    tipo: "hotel",
    acomodacoes: [
      { tipo: "Solteiro Simples", quantidade: 14 },
      { tipo: "Família Super", quantidade: 7 },
    ],
  },
];
