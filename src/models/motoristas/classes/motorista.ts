import { commonValidators } from 'src/validators/commonValidators';

export class Motorista {
  id: string;
  nome: string;
  foto: ImageBitmap;
  comissao: number;

  constructor(params: Partial<Motorista>) {
    this.nome = params.nome;
    this.foto = params.foto || undefined;
    this.comissao = params.comissao;
  }
}
