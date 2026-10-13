export interface PortfolioActivity {
  description: string;
  duration: string;
  links: string[];
}

export interface ActivityErrorState {
  description?: string;
  duration?: string;
  links?: (string | undefined)[];
}

/** Quantidade de atividades que o profissional pode cadastrar. */
export const ACTIVITY_SLOT_COUNT = 3;
export const ACTIVITY_DESCRIPTION_MIN = 30;
export const MAX_ACTIVITY_LINKS = 3;

export const createEmptyActivity = (): PortfolioActivity => ({
  description: "",
  duration: "",
  links: [""],
});

export const activityFieldId = (index: number, field: string) => `activity-${index + 1}-${field}`;
