const TIME_UNITS = [
    { unit: 'yıl', seconds: 31536000 },
    { unit: 'ay', seconds: 2592000 },
    { unit: 'gün', seconds: 86400 },
    { unit: 'saat', seconds: 3600 },
    { unit: 'dakika', seconds: 60 },
    { unit: 'saniye', seconds: 1 }
  ] as const;
  
  export function timeAgo(date: string | number | Date): string {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diffInSeconds = Math.floor((now - past) / 1000);
  
    if (diffInSeconds < 5) return 'şimdi';
  
    for (const { unit, seconds } of TIME_UNITS) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? '' : ''} önce`;
      }
    }
  
    return 'şimdi';
  }