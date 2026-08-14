export interface AppAlert {
  type: string;
  message: string;
  translationParameters?: {
    [key: string]: string;
  };
  action?: string;
  container?: string;
}
