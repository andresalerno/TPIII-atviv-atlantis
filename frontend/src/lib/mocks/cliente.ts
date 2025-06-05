export interface Telefone {
  id: number;
  ddd: string;
  numero: string;
}

export interface Endereco {
  id: number;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
}

export interface Documento {
  id: number;
  tipo: "CPF" | "RG" | "Passaporte";
  numero: string;
  dataExpedicao: Date;
}

export interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  dataNascimento: Date;
  dataCadastro: Date;
  telefones: Telefone[];
  enderecos: Endereco[];
  documentos: Documento[];
  dependentes: Cliente[];
  titular: Cliente | null;
}

// Titular com dependentes (dependentes sem dependentes e com titular setado)

const cliente1: Cliente = {
  id: 1,
  nome: "Carlos Eduardo Santos",
  nomeSocial: "Carlos",
  dataNascimento: new Date("1985-03-15"),
  dataCadastro: new Date("2020-01-10"),
  telefones: [
    { id: 1, ddd: "(11)", numero: "91234-5678" },
    { id: 2, ddd: "(11)", numero: "3344-5566" },
  ],
  enderecos: [
    {
      id: 1,
      rua: "Rua das Flores",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      codigoPostal: "01234-567",
    },
  ],
  documentos: [
    {
      id: 1,
      tipo: "CPF",
      numero: "123.456.789-00",
      dataExpedicao: new Date("2005-05-20"),
    },
    {
      id: 2,
      tipo: "RG",
      numero: "12.345.678-9",
      dataExpedicao: new Date("2005-06-15"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente2: Cliente = {
  id: 2,
  nome: "Ana Silva",
  nomeSocial: "Ana",
  dataNascimento: new Date("2010-05-20"),
  dataCadastro: new Date("2021-01-01"),
  telefones: [{ id: 3, ddd: "(11)", numero: "99876-5432" }],
  enderecos: [
    {
      id: 2,
      rua: "Rua das Acácias",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      codigoPostal: "01234-567",
    },
  ],
  documentos: [
    {
      id: 3,
      tipo: "CPF",
      numero: "987.654.321-00",
      dataExpedicao: new Date("2015-08-15"),
    },
  ],
  dependentes: [],
  titular: cliente1,
};

const cliente3: Cliente = {
  id: 3,
  nome: "Pedro Santos",
  nomeSocial: "Pedro",
  dataNascimento: new Date("2012-09-15"),
  dataCadastro: new Date("2022-02-02"),
  telefones: [{ id: 4, ddd: "(11)", numero: "98765-4321" }],
  enderecos: [
    {
      id: 3,
      rua: "Rua das Acácias",
      bairro: "Jardim Primavera",
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      codigoPostal: "01234-567",
    },
  ],
  documentos: [
    {
      id: 4,
      tipo: "RG",
      numero: "22.333.444-5",
      dataExpedicao: new Date("2019-03-01"),
    },
  ],
  dependentes: [],
  titular: cliente1,
};

cliente1.dependentes.push(cliente2, cliente3);

const cliente4: Cliente = {
  id: 4,
  nome: "Fernanda Oliveira",
  nomeSocial: "Nanda",
  dataNascimento: new Date("1990-07-22"),
  dataCadastro: new Date("2021-03-05"),
  telefones: [{ id: 5, ddd: "(12)", numero: "99876-5432" }],
  enderecos: [
    {
      id: 4,
      rua: "Avenida Central",
      bairro: "Centro",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      pais: "Brasil",
      codigoPostal: "20000-000",
    },
  ],
  documentos: [
    {
      id: 6,
      tipo: "CPF",
      numero: "987.654.321-01",
      dataExpedicao: new Date("2010-09-10"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente5: Cliente = {
  id: 5,
  nome: "Lucas Pereira",
  nomeSocial: "Lu",
  dataNascimento: new Date("1995-08-18"),
  dataCadastro: new Date("2021-01-20"),
  telefones: [{ id: 7, ddd: "(51)", numero: "97777-6666" }],
  enderecos: [
    {
      id: 5,
      rua: "Avenida Brasil",
      bairro: "Zona Sul",
      cidade: "Porto Alegre",
      estado: "RS",
      pais: "Brasil",
      codigoPostal: "90000-000",
    },
  ],
  documentos: [
    {
      id: 8,
      tipo: "CPF",
      numero: "789.123.456-00",
      dataExpedicao: new Date("2012-09-20"),
    },
  ],
  dependentes: [],
  titular: null,
};

// Outro titular com dependente:
const cliente6: Cliente = {
  id: 6,
  nome: "Patrícia Martins",
  nomeSocial: "Paty",
  dataNascimento: new Date("1982-11-05"),
  dataCadastro: new Date("2017-03-14"),
  telefones: [{ id: 9, ddd: "(61)", numero: "91234-1111" }],
  enderecos: [
    {
      id: 6,
      rua: "Rua das Laranjeiras",
      bairro: "Asa Sul",
      cidade: "Brasília",
      estado: "DF",
      pais: "Brasil",
      codigoPostal: "70000-000",
    },
  ],
  documentos: [
    {
      id: 10,
      tipo: "CPF",
      numero: "654.321.987-00",
      dataExpedicao: new Date("2007-07-12"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente7: Cliente = {
  id: 7,
  nome: "Thiago Costa",
  nomeSocial: "Thi",
  dataNascimento: new Date("1992-02-14"),
  dataCadastro: new Date("2020-11-11"),
  telefones: [{ id: 11, ddd: "(71)", numero: "96666-5555" }],
  enderecos: [
    {
      id: 7,
      rua: "Rua do Sol",
      bairro: "Pelourinho",
      cidade: "Salvador",
      estado: "BA",
      pais: "Brasil",
      codigoPostal: "40000-000",
    },
  ],
  documentos: [
    {
      id: 12,
      tipo: "CPF",
      numero: "321.789.654-00",
      dataExpedicao: new Date("2011-05-05"),
    },
  ],
  dependentes: [],
  titular: cliente6,
};

cliente6.dependentes.push(cliente7);

// Clientes 8 a 15 independentes sem dependentes/titular para simplificar

const cliente8: Cliente = {
  id: 8,
  nome: "Juliana Fernandes",
  nomeSocial: "Juju",
  dataNascimento: new Date("1987-09-09"),
  dataCadastro: new Date("2018-08-20"),
  telefones: [
    { id: 13, ddd: "(81)", numero: "95555-4444" },
    { id: 14, ddd: "(81)", numero: "3333-2222" },
  ],
  enderecos: [
    {
      id: 8,
      rua: "Rua das Orquídeas",
      bairro: "Boa Viagem",
      cidade: "Recife",
      estado: "PE",
      pais: "Brasil",
      codigoPostal: "50000-000",
    },
  ],
  documentos: [
    {
      id: 15,
      tipo: "CPF",
      numero: "987.321.654-00",
      dataExpedicao: new Date("2009-12-15"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente9: Cliente = {
  id: 9,
  nome: "Rafael Lima",
  nomeSocial: "Rafa",
  dataNascimento: new Date("1979-04-28"),
  dataCadastro: new Date("2016-05-10"),
  telefones: [{ id: 16, ddd: "(91)", numero: "98888-3333" }],
  enderecos: [
    {
      id: 9,
      rua: "Rua do Comércio",
      bairro: "Centro",
      cidade: "Belém",
      estado: "PA",
      pais: "Brasil",
      codigoPostal: "66000-000",
    },
  ],
  documentos: [
    {
      id: 17,
      tipo: "CPF",
      numero: "654.987.321-00",
      dataExpedicao: new Date("2003-03-30"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente10: Cliente = {
  id: 10,
  nome: "Marcos Vinícius",
  nomeSocial: "Marquinhos",
  dataNascimento: new Date("1983-06-12"),
  dataCadastro: new Date("2019-04-05"),
  telefones: [{ id: 18, ddd: "(51)", numero: "91234-2222" }],
  enderecos: [
    {
      id: 10,
      rua: "Avenida Ipiranga",
      bairro: "Centro",
      cidade: "Porto Alegre",
      estado: "RS",
      pais: "Brasil",
      codigoPostal: "90000-000",
    },
  ],
  documentos: [
    {
      id: 19,
      tipo: "CPF",
      numero: "321.654.123-00",
      dataExpedicao: new Date("2006-06-06"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente11: Cliente = {
  id: 11,
  nome: "Amanda Souza",
  nomeSocial: "Mandy",
  dataNascimento: new Date("1991-01-01"),
  dataCadastro: new Date("2022-02-02"),
  telefones: [{ id: 20, ddd: "(61)", numero: "99999-1111" }],
  enderecos: [
    {
      id: 11,
      rua: "Rua das Laranjeiras",
      bairro: "Asa Norte",
      cidade: "Brasília",
      estado: "DF",
      pais: "Brasil",
      codigoPostal: "70000-000",
    },
  ],
  documentos: [
    {
      id: 21,
      tipo: "CPF",
      numero: "111.222.333-44",
      dataExpedicao: new Date("2018-08-08"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente12: Cliente = {
  id: 12,
  nome: "Gabriel Mendes",
  nomeSocial: "Gabi",
  dataNascimento: new Date("1989-11-11"),
  dataCadastro: new Date("2017-07-07"),
  telefones: [
    { id: 22, ddd: "(71)", numero: "98888-2222" },
    { id: 23, ddd: "(71)", numero: "3333-1111" },
  ],
  enderecos: [
    {
      id: 12,
      rua: "Rua da Paz",
      bairro: "Ondina",
      cidade: "Salvador",
      estado: "BA",
      pais: "Brasil",
      codigoPostal: "40000-000",
    },
  ],
  documentos: [
    {
      id: 24,
      tipo: "CPF",
      numero: "555.666.777-88",
      dataExpedicao: new Date("2013-03-03"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente13: Cliente = {
  id: 13,
  nome: "Patrícia Nunes",
  nomeSocial: "Paty",
  dataNascimento: new Date("1984-08-08"),
  dataCadastro: new Date("2016-10-10"),
  telefones: [{ id: 25, ddd: "(85)", numero: "97777-3333" }],
  enderecos: [
    {
      id: 13,
      rua: "Avenida Beira Mar",
      bairro: "Meireles",
      cidade: "Fortaleza",
      estado: "CE",
      pais: "Brasil",
      codigoPostal: "60000-000",
    },
  ],
  documentos: [
    {
      id: 26,
      tipo: "CPF",
      numero: "999.888.777-66",
      dataExpedicao: new Date("2009-01-01"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente14: Cliente = {
  id: 14,
  nome: "Ricardo Gomes",
  nomeSocial: "Ricardinho",
  dataNascimento: new Date("1978-03-03"),
  dataCadastro: new Date("2015-05-05"),
  telefones: [{ id: 27, ddd: "(41)", numero: "92222-3333" }],
  enderecos: [
    {
      id: 14,
      rua: "Rua XV de Novembro",
      bairro: "Centro",
      cidade: "Curitiba",
      estado: "PR",
      pais: "Brasil",
      codigoPostal: "80000-000",
    },
  ],
  documentos: [
    {
      id: 28,
      tipo: "CPF",
      numero: "123.321.123-45",
      dataExpedicao: new Date("2000-12-12"),
    },
  ],
  dependentes: [],
  titular: null,
};

const cliente15: Cliente = {
  id: 15,
  nome: "Sofia Carvalho",
  nomeSocial: "Sofi",
  dataNascimento: new Date("1993-09-09"),
  dataCadastro: new Date("2019-09-09"),
  telefones: [
    { id: 29, ddd: "(11)", numero: "93333-4444" },
    { id: 30, ddd: "(11)", numero: "3333-4444" },
  ],
  enderecos: [
    {
      id: 15,
      rua: "Rua das Margaridas",
      bairro: "Vila Nova",
      cidade: "São Paulo",
      estado: "SP",
      pais: "Brasil",
      codigoPostal: "04500-000",
    },
  ],
  documentos: [
    {
      id: 31,
      tipo: "CPF",
      numero: "222.333.444-55",
      dataExpedicao: new Date("2014-11-11"),
    },
  ],
  dependentes: [],
  titular: null,
};

export const clientesMock: Cliente[] = [
  cliente1,
  cliente2,
  cliente3,
  cliente4,
  cliente5,
  cliente6,
  cliente7,
  cliente8,
  cliente9,
  cliente10,
  cliente11,
  cliente12,
  cliente13,
  cliente14,
  cliente15,
];
