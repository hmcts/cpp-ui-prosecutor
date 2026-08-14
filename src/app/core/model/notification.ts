export interface AppNotification {
  type: string;
  message: string;
  translationParameters?: {
    [key: string]: string;
  };
  action?: string;
}
