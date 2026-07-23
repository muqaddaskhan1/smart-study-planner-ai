export function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return Promise.resolve(false);
  if (Notification.permission === 'granted') return Promise.resolve(true);
  if (Notification.permission === 'denied') return Promise.resolve(false);
  return Notification.requestPermission().then((p) => p === 'granted');
}

export function showNotification(title: string, body: string) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body });
  }
}

export function scheduleReminder(timeStr: string, callback: () => void): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const now = new Date();
  const reminder = new Date();
  reminder.setHours(hours, minutes, 0, 0);
  if (reminder <= now) {
    reminder.setDate(reminder.getDate() + 1);
  }
  const msUntil = reminder.getTime() - now.getTime();
  return window.setTimeout(() => {
    callback();
    scheduleReminder(timeStr, callback);
  }, msUntil);
}
