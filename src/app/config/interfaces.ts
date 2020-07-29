export interface AppConfig {
  apiRoot: string;
  cppHomeUrl: string;
  idamProfilePage: string;
  idamLogoutPage: string;
  isPollingDisabled: boolean;
  appUrl: string;
}

export interface UserGroup {
  groupId: string;
  groupName: string;
}
