/**
 * Tipos relacionados ao Dashboard
 */

export interface DashboardStats {
  mesAtual: {
    horasTrabalhadas: number;
    horasTotais: number;
    percentual: number;
  };
  saldo: {
    horas: string; // formato "+04:30"
    tipo: 'banco' | 'extra';
  };
}

export interface WeeklySummary {
  dia: string; // "SEG", "TER", etc.
  horas: number;
  isToday?: boolean;
  isActive?: boolean;
}

export interface ActivityItem {
  id: string;
  tipo: 'entrada' | 'saida' | 'almoco' | 'retorno';
  titulo: string;
  subtitulo: string;
  hora: string; // formato "08:00" ou "--:--"
  status: 'no-horario' | 'atrasado' | 'pendente';
  local?: string;
}

