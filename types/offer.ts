export type OfferType = "internship" | "project" | "advisory";

export interface OfferI {
  id: number;
  type: OfferType;
  description: string;
  supervisorRequired: boolean;
  team: boolean;
  createdAt: Date;
}
