export class Caminhao {
  id: string;
  frota: string;
  placa: string;
  constructor(params: Partial<Caminhao>) {
    this.frota = params.frota;
    this.placa = params.placa;
  }
}
