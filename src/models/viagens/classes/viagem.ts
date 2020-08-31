
export class Viagem {
  id?: string;
  chegada: string;
  partida: string;
  motorista: string;
  frete: number;
  adiantamento?: number;
  placa_carreta: string;
  data_partida: string;
  data_chegada?: string;
  km_partida: number;
  km_chegada?: number;
  despesas?: string[] = [];
  obs: string;

  constructor(params: Partial<Viagem>) {
    params.adiantamento == undefined ? params.adiantamento = (params.frete * 0.5) : params.adiantamento

    this.partida = params.partida;
    this.chegada = params.chegada;
    this.motorista = params.motorista;
    this.frete = params.frete;
    this.adiantamento = params.adiantamento || undefined;
    this.placa_carreta = params.placa_carreta;
    this.data_partida = params.data_partida;
    this.data_chegada = params.data_chegada || undefined;
    this.km_partida = params.km_partida;
    this.km_chegada = params.km_chegada || undefined;
    this.obs = params.obs || '';

    this.despesas = [];
    if (params.despesas == undefined || params.despesas.length > 0) {
      this.despesas = params.despesas;
    }
    console.log(this);
  }
}
