export interface User {
  id: string;
  name: string;
  email: string;
  socialLinkProvider: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  tags: string[];
  postedAt: string;
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

export type SortByField = 'likes' | 'comments' | 'date';

export type SortOrder = 'asc' | 'desc';
