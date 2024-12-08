export interface User {
  id: string;
  name: string;
  email: string;
  socialLinkProvider: string;
}

export interface PostInteraction {
  id: string;
  userId: string;
  postId: number;
  post?: Post;
}

export interface Resign {
  id: number;
  ano: number;
  valorRenunciado: number;
  tipoRenuncia: string;
  descricaoBeneficioFiscal: string;
  descricaoFundamentoLegal: string;
  tributo: string;
  formaTributacao: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnaeCodigoGrupo: string;
  cnaeCodigoClasse: string;
  cnaeCodigoSubClasse: string;
  cnaeNomeClasse: string;
  cnaeDivisao: string;
  uf: string;
  municipio: string;
  codigoIBGE: string;
}

export interface FamilyScholarship {
  id: number;
  dataReferencia: string;
  municipio: {
    codigoIBGE: string;
    nomeIBGE: string;
    codigoRegiao: string;
    nomeRegiao: string;
    pais: string;
    uf: {
      sigla: string;
      nome: string;
    };
  };
  tipo: {
    id: number;
    descricao: string;
    descricaoDetalhada: string;
  };
  valor: number;
  quantidadeBeneficiados: number;
}

export interface Adment {
  id: number;
  codigoEmenda: string;
  ano: number;
  tipoEmenda: string;
  autor: string;
  nomeAutor: string;
  numeroEmenda: string;
  localidadeDoGasto: string;
  funcao: string;
  subfuncao: string;
  valorEmpenhado: string;
  valorLiquidado: string;
  valorPago: string;
  valorRestoInscrito: string;
  valorRestoCancelado: string;
  valorRestoPago: string;
}

export interface Post {
  userId: string;
  id: number;
  title?: string;
  desc?: string;
  tags?: string;
  pubDate: string;
  likes: Like[];
  comments: string[];
}

export interface Like {
  likeId: number;
  userId: string;
}

export type SortByField = 'likes' | 'comments' | 'date';

export type SortOrder = 'asc' | 'desc';

export type DataType = 'resigns' | 'adments' | 'family-scholarships';

export const dataAttributes = {
  resigns: {
    "Ano": "ano",
    "Valor Renunciado": "valorRenunciado",
    "Tipo de Renúncia": "tipoRenuncia",
    "Benefício Fiscal": "descricaoBeneficioFiscal",
    "Fundamento Legal": "descricaoFundamentoLegal",
    "Tributo": "tributo",
    "Forma de Tributação": "formaTributacao",
    "CNPJ": "cnpj",
    "Razão Social": "razaoSocial",
    "Nome Fantasia": "nomeFantasia",
    "Código do Grupo": "cnaeCodigoGrupo",
    "Código da Classe": "cnaeCodigoClasse",
    "Código da Subclasse": "cnaeCodigoSubClasse",
    "Nome da Classe": "cnaeNomeClasse",
    "Divisão": "cnaeDivisao",
    "UF": "uf",
    "Município": "municipio",
    "Código IBGE": "codigoIBGE",
    "ID": "id"
  },
  familyScholarships: {
    "ID": "id",
    "Data de Referência": "dataReferencia",
    "Município (Código IBGE)": "municipio.codigoIBGE",
    "Município (Nome)": "municipio.nomeIBGE",
    "Região (Código)": "municipio.codigoRegiao",
    "Região (Nome)": "municipio.nomeRegiao",
    "País": "municipio.pais",
    "UF (Sigla)": "municipio.uf.sigla",
    "UF (Nome)": "municipio.uf.nome",
    "Tipo": "tipo.descricao",
    "Descrição Detalhada": "tipo.descricaoDetalhada",
    "Valor": "valor",
    "Quantidade de Beneficiados": "quantidadeBeneficiados"
  },
  adments: {
    "Código da Emenda": "codigoEmenda",
    "Ano": "ano",
    "Tipo de Emenda": "tipoEmenda",
    "Autor": "autor",
    "Nome do Autor": "nomeAutor",
    "Número da Emenda": "numeroEmenda",
    "Localidade do Gasto": "localidadeDoGasto",
    "Função": "funcao",
    "Subfunção": "subfuncao",
    "Valor Empenhado": "valorEmpenhado",
    "Valor Liquidado": "valorLiquidado",
    "Valor Pago": "valorPago",
    "Valor do Resto Inscrito": "valorRestoInscrito",
    "Valor do Resto Cancelado": "valorRestoCancelado",
    "Valor do Resto Pago": "valorRestoPago",
    "ID": "id"
  }
};
