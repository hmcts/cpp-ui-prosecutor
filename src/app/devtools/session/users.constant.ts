export interface User {
  id: string;
  displayName: string;
  default?: boolean;
}

export const mockUsers: User[] = [
  {
    id: 'fcd33f4a-f286-4f3a-a8b9-d6e05fbbc3f7',
    displayName: 'Trevor Lawson (Tvl)',

  },
  {
    id: 'b07c8200-5d04-4266-9521-c2312734a9d3',
    displayName: 'David Brown (Tfl)'
  },
  {
    id: '919d2dd0-5f6e-4f7b-89d5-31be30840770',
    displayName: 'Frank Michaels (DVLA)',
    default: true
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
