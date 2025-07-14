import type { UserI } from "./team";

export type OfferType = "internship" | "project" | "advisory";

export interface OfferI {
  id: number;
  type: OfferType;
  description: string;
  supervisorRequired: boolean;
  team: boolean;
  createdAt: string;
}

export interface OfferDetalledI extends OfferI {
  user: UserDetalledI;
}

export interface UserDetalledI extends UserI {
  role: string;
}
