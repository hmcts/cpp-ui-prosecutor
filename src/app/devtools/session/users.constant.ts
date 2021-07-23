export interface User {
  id: string;
  displayName: string;
  default?: boolean;
}

export const mockUsers: User[] = [
  {
    id: '85435116-0f4b-4616-ae9a-9954ed1c3ee1',
    displayName: 'Trevor Lawson (Tvl)',
    default: true
  },
  {
    id: 'b07c8200-5d04-4266-9521-c2312734a9d3',
    displayName: 'David Brown (Tfl)'
  },
  {
    id: '8dcc4c93-2fe4-44aa-896e-511a28da0a70',
    displayName: 'Frank Michaels (DVLA)'
  },
  {
    id: 'c2a3f402-7b77-4b0a-b284-454ff0c58e06',
    displayName: 'Glenn Thornton (Warwickshire Police)'
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
