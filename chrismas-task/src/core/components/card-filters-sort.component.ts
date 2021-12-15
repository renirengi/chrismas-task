export function sortMax(array:[object], key:string){
  return array.sort(function(a, b)
 {
  let x = a[key];
  let y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}

export function sortMin(array:[object], key:string){
  return array.sort(function(a, b)
 {
  let x = a[key];
  let y = b[key];
  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
 });
}
