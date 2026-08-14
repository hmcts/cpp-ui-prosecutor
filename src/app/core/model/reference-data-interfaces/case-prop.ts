export interface CaseProp {
  id: string;
  code: string;
  description: string;
}

export interface CustodyStatus {
  id: string;
  statusCode: string;
  statusDescription: string;
}

export interface CustodyStatusMap {
  [id: string]: CaseProp;
}
