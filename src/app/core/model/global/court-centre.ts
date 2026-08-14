import { Address } from './address';

export interface CourtCentre {
  id: string;
  name?: string;
  oucode?: string;
  welshName?: string;
  roomId?: string;
  roomName?: string;
  welshRoomName?: string;
  address?: Address;
  lja?: {
    ljaCode: string;
    ljaName: string;
  };
  oucodeL1Code?: string;
  oucodeL3Name?: string;
}

export interface CourtRoom {
  id: string;
  name: string;
}

export interface CourtCentreWithRooms extends CourtCentre {
  courtrooms: CourtRoom[];
}
