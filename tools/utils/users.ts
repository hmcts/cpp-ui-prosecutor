export interface TestUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  source: 'CPP' | 'SYSTEM';
}

export const WARWICKSHIRE_POLICE_USER: TestUser = {
  userId: 'c2a3f402-7b77-4b0a-b284-454ff0c58e06',
  firstName: 'Glenn',
  lastName: 'Thornton',
  email: 'glenn@test.police.net',
  source: 'CPP'
};

export const TFL_USER: TestUser = {
  userId: '1bf60455-11c9-427e-b087-d8331dcea44f',
  firstName: 'David',
  lastName: 'Brown',
  email: 'david@test.tfl.net',
  password: 'Password1234!',
  source: 'CPP'
};

export const TVL_USER: TestUser = {
  userId: '85435116-0f4b-4616-ae9a-9954ed1c3ee1',
  firstName: 'Trevor',
  lastName: 'Lawson',
  email: 'trevor@test.tvl.uk',
  password: 'Password123!',
  source: 'CPP'
};

export const SYSTEM_TVL_USER: TestUser = {
  userId: '2c8810b9-1d06-4830-af49-d341c022a217',
  firstName: 'cpptvlconsumer',
  lastName: 'system',
  email: 'cppitvlconsumer@system.gov',
  source: 'CPP'
};

export const SYSTEM_ONLINE_PLEA_USER: TestUser = {
  userId: 'a056f352-2e73-405d-8ae8-7a5d8a545b7d',
  firstName: 'online-plea',
  lastName: 'system',
  email: 'onlineplea@hmcts.gov',
  source: 'CPP'
};

export const COURT_ADMIN: TestUser = {
  userId: 'a9448185-672e-4aea-94d6-5988355ed459',
  firstName: 'Helen',
  lastName: 'Sutton',
  email: 'helen@test.hmcts.net',
  password: 'Password1234!',
  source: 'CPP'
};

export const LEGAL_ADVISER: TestUser = {
  userId: 'a085e359-6069-4694-8820-7810e7dfe762',
  firstName: 'Erica',
  lastName: 'Wilson',
  email: 'erica@test.hmcts.net',
  password: 'Password12345!',
  source: 'CPP'
};

export const LEGAL_ADVISER_2: TestUser = {
  userId: '735b9bf6-2f4c-4947-92af-b607c7d2880f',
  firstName: 'Evan',
  lastName: 'Roberts',
  email: 'evan@test.hmcts.net',
  password: 'Password1234!',
  source: 'CPP'
};

export const SYSTEM_DVLA_USER: TestUser = {
  userId: '5d92bed6-8149-4926-9e4e-9dcfd7f319dc',
  firstName: 'cppidvlaconsumer',
  lastName: 'system',
  email: 'cppidvlaconsumer@system.gov',
  source: 'CPP'
};

export const SYSTEM_SJP_USER: TestUser = {
  userId: '1ac91935-4f82-4a4f-bd17-fb50397e42dd',
  firstName: 'sjp',
  lastName: 'context',
  email: 'sjp@hmcts.gov',
  source: 'CPP'
};
