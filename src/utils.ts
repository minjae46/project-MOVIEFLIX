export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeReleaseDate(date: string) {
  const formatDate = new Date(date);
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const day = formatDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export function makeRuntimeToHour(runtime: number) {
  const hour = Math.floor(runtime / 60);
  const minutes = runtime - hour * 60;
  return `${hour}시간 ${minutes}분`;
}
