export interface AppConfig {
  apiRoot: string;
  cppHomeUrl: string;
  idamProfilePage: string;
  idamLogoutPage: string;
  isPollingDisabled: boolean;
}

export interface UserGroup {
  groupId: string;
  groupName: string;
}
