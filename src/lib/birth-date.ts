export const MIN_AGE = 18;

export interface BirthDate {
  day: string;
  month: string;
  year: string;
}

export const EMPTY_BIRTH_DATE: BirthDate = { day: "", month: "", year: "" };

export const isBirthDateEmpty = (value: BirthDate) =>
  !value.day && !value.month && !value.year;

/** Valida a data de nascimento (DD/MM/AAAA) e a idade mínima. */
export const validateBirthDate = ({ day, month, year }: BirthDate): string | undefined => {
  if (!day || !month || !year) return "Informe a data de nascimento completa.";
  if (year.length !== 4) return "Informe o ano com 4 dígitos.";

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);

  if (monthNumber < 1 || monthNumber > 12) return "Informe um mês entre 01 e 12.";
  if (dayNumber < 1 || dayNumber > 31) return "Informe um dia entre 01 e 31.";

  const date = new Date(yearNumber, monthNumber - 1, dayNumber);
  const exists =
    date.getDate() === dayNumber &&
    date.getMonth() === monthNumber - 1 &&
    date.getFullYear() === yearNumber;

  if (!exists) return "Esta data não existe.";

  const today = new Date();
  if (date > today) return "A data de nascimento não pode ser no futuro.";

  let age = today.getFullYear() - yearNumber;
  const monthDiff = today.getMonth() - (monthNumber - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dayNumber)) age -= 1;

  if (age < MIN_AGE) return `É necessário ter ${MIN_AGE} anos ou mais.`;

  return undefined;
};
