export interface User {
  id: string;
  displayName: string;
  default?: boolean;
}

export const mockUsers: User[] = [
  {
    id: '1bf60455-11c9-427e-b087-d8331dcea44f',
    displayName: 'ATCM - Court Admin',
    default: true
  },
  {
    id: '85435116-0f4b-4616-ae9a-9954ed1c3ee1',
    displayName: 'Trevor Lawson'
  },
  {
    id: 'a9448185-672e-4aea-94d6-5988355ed459',
    displayName: 'Court admin user'
  },
  {
    id: '8748f1c0-ec47-415d-9ef9-7caa3bcb00b5',
    displayName: 'ATCM legal adviser delegate power user'
  },
  {
    id: 'a085e359-6069-4694-8820-7810e7dfe762',
    displayName: 'ATCM legal adviser user'
  },
  {
    id: '515fc7e8-753d-49f2-af64-af82276c49a1',
    displayName: 'ATCM MCSS user'
  }
];
