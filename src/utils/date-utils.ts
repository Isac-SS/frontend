export class DateUtils {
    static formatarParaBr(data: Date): string {
      const dia = ('0' + data.getDate()).slice(-2);
      const mes = ('0' + (data.getMonth() + 1)).slice(-2);
      const ano = data.getFullYear().toString().slice(-2);
      
      return `${dia}/${mes}/${ano}`;
    }
  
    static formatarParaISO(data: Date): string {
      return data.toISOString();
    }
  
    static converterParaDateBr(dataStr: string): Date {
      const partes = dataStr.split('/');
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1; 
      const ano = parseInt(partes[2], 10) + 2000; 
      
      return new Date(ano, mes, dia);
    }
  }
  