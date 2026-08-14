import { Offence, ProsecutionCaseIdentifier } from '.';

export interface CourtOrderOffence {
  offence: Offence;
  prosecutionCaseId: string;
  prosecutionCaseIdentifier: ProsecutionCaseIdentifier;
}

export interface OrderingCourt {
  courtHearingLocation: string;
  id: string;
  name: string;
  psaCode: number;
  roomId: string;
  roomName: string;
  welshName: string;
  welshRoomName: string;
}

export interface CourtOrder {
  id: string;
  canBeSubjectOfBreachProceedings: boolean;
  canBeSubjectOfVariationProceedings: boolean;
  courtOrderOffences: CourtOrderOffence[];
  courtOrderSubject: string;
  orderDate: string;
  startDate: string;
  isSJPOrder: boolean;
  judicialResultTypeId: string;
  label: string;
  orderingHearingId: string;
  orderingCourt: OrderingCourt;
}

export interface ActiveCourtOrder {
  masterDefendantId: string;
  courtOrders: CourtOrder[];
}
