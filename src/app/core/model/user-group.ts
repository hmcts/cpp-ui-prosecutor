export interface UserGroup {
  groupId: string;
  groupName: string;
}
export interface LoggedInUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserForOrganisation {
  userId: string;
  firstName: string;
  lastName: string;
  email?: string;
}
