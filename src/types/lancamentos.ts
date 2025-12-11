/**
 * Tipos relacionados a lançamentos de ponto
 */

export type TipoLancamento = 'entrada' | 'saida' | 'almoco' | 'retorno' | 'faltante';
export type StatusDia = 'completo' | 'pendente' | 'incompleto';
export type TipoRegistro = 'regular' | 'intervalo';

export interface Lancamento {
  id: string;
  tipo: TipoLancamento;
  tipoRegistro: TipoRegistro;
  hora: string; // formato HH:mm
  data: string; // formato YYYY-MM-DD
}

export interface DiaLancamentos {
  data: string; // formato YYYY-MM-DD
  dataFormatada: string; // formato "23 Out"
  diaSemana?: string; // "Hoje", "Sexta", etc.
  status: StatusDia;
  lancamentos: Lancamento[];
}

export interface ResumoPeriodo {
  horasTotais: string; // formato "168h 20m"
  saldoBanco: string; // formato "+02h 10m"
}

export interface FormLancamento {
  dataRegistro: string; // formato DD/MM/YYYY
  primeiroTurno: {
    entrada: string; // formato HH:mm
    saida: string;
  };
  intervalo: {
    inicio: string;
    fim: string;
  };
  segundoTurno: {
    entrada: string;
    saida: string;
  };
  isDiaria: boolean;
  isFalta: boolean;
}

