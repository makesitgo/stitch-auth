export type AlertType = 'success' | 'info' | 'warn' | 'error' | 'debug';

export const Alert = (type: AlertType, message: string) => ({
  type,
  time: new Date().toLocaleString(),
  message,
});

export interface Alert extends ReturnType<typeof Alert> {}

export type AlertsState = typeof initialAlertsState;

export const initialAlertsState = {
  working: false,
  queue: [] as Alert[]
}
