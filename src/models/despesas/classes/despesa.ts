export class Despesas {
  id?: string;
  valor: number;
  data: string;
  tipo: string; // abastecimento - outros - caminhao
  litros?: number;
  km?: number;
  nome?: string;
  id_responsavel: string;

  constructor(params: Partial<Despesas>) {
    const tipoDespesa = localStorage.getItem('tipos-despesa').split(',')
    
    this.valor = params.valor;
    this.data = params.data;
    this.tipo = params.tipo;
    this.nome = null;
    this.litros = null;
    this.km = null;



    if (params.tipo == 'combustivel' || 'outros') {
      this.nome = params.nome;
      if (params.tipo == 'combustivel') {
        this.litros = params.litros;
        this.km = params.km;
      }
    }
  }
}

