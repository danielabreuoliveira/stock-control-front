export interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    precoCompra: number;
    precoVenda: number;
    estoque: number;
    codigoBarras: string;
    ativo: boolean;
    categoriaId: number;
    categoriaNome?: string;
}