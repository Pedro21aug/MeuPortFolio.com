/** Aceita "https://site.com", "site.com.br" ou "www.site.com/pagina". */
export const isValidUrl = (value: string): boolean =>
  /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(value.trim());
