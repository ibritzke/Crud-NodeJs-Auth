export function formatarData(data: any) {
  const [day, month, year] = data.split("/");
  return `${year}-${month}-${day}`;
}
