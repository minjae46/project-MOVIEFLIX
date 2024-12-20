export function makeImagePath(path: string) {
  return `https://image.tmdb.org/t/p/original/${path}`;
}

export function makeReleaseDate(fullDate: string) {
  const formatDate = new Date(fullDate);
  const year = formatDate.getFullYear();
  const month = formatDate.getMonth() + 1;
  const date = formatDate.getDate();
  return `${year}년 ${month}월 ${date}일`;
}

export function makeRuntimeToHour(runtime: number) {
  const hour = Math.floor(runtime / 60);
  const minutes = runtime - hour * 60;
  return `${hour}시간 ${minutes}분`;
}
