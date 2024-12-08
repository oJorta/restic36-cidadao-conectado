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
