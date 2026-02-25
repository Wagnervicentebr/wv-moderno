/**
 * Extrai o VIDEO_ID de uma URL do YouTube.
 * Suporta: watch?v=, embed/, youtu.be/, live/
 */
export function extractYoutubeVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  // watch?v=VIDEO_ID ou watch?list=...&v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?)(?:.*&)?v=([\w-]{11})(?:[?&/]|$)/i);
  if (watchMatch) return watchMatch[1];
  // embed/VIDEO_ID ou live/VIDEO_ID
  const embedMatch = trimmed.match(/youtube\.com\/(?:embed|live)\/([\w-]{11})(?:[?&/]|$)/i);
  if (embedMatch) return embedMatch[1];
  // youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/youtu\.be\/([\w-]{11})(?:[?&/]|$)/i);
  if (shortMatch) return shortMatch[1];
  // Se for só o ID (11 caracteres alfanuméricos, _ e -)
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

/**
 * Formata duração em minutos para exibição: "X min" ou "Xh Ymin".
 */
export function formatDuration(minutes: number): string {
  const m = Math.floor(Number(minutes)) || 0;
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const min = m % 60;
  if (min === 0) return `${h}h`;
  return `${h}h ${min}min`;
}
