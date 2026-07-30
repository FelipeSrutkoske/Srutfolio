/**
 * Seleciona o valor localizado de um campo de dados.
 * Os arquivos em data/ são escritos em PT (padrão) e podem declarar
 * sobrescritas opcionais em inglês (`campoEn`).
 */
export function pick<T>(locale: string, fallback: T, en: T | undefined): T {
  return locale === "en" && en !== undefined ? en : fallback;
}
