export interface User {
  id: string;
  displayName: string;
  default?: boolean;
}

export const mockUsers: User[] = [
  {
    id: '1bf60455-11c9-427e-b087-d8331dcea44f',
    displayName: 'ATCM - Court Admin'
  },
  {
    id: '85435116-0f4b-4616-ae9a-9954ed1c3ee1',
    displayName: 'Trevor Lawson (Tvl)',
    default: true
  },
  {
    id: '1bf60455-11c9-427e-b087-d8331dcea44f',
    displayName: 'David Brown (Tfl)'
  },
  {
    id: 'a9448185-672e-4aea-94d6-5988355ed459',
    displayName: 'Helen Sutton (Court Admin)'
  },

  {
    id: '735b9bf6-2f4c-4947-92af-b607c7d2880f',
    displayName: 'Evan Roberts (Legal advisor)'
  },
  {
    id: 'a085e359-6069-4694-8820-7810e7dfe762',
    displayName: 'Erica Wilson (Legal advisor)'
  }
];
