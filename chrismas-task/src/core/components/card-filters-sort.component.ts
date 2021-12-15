
 export function sortCard(array:[object]){
   const changeOptions = document.querySelector('.sort-select');
 if (changeOptions.value==="sort-name-max"){
   sortMax(array,'name');
 }
 else if(changeOptions.value==="sort-name-min"){
   sortMin(array,'name');
 }
 else if (changeOptions.value==="sort-count-max"){
   sortMax(array,'count');
 }
 else if (changeOptions.value==="sort-count-min"){
   sortMin(array,'count');
 }
 console.log (array);
 return array;
}

 function sortMax(array:[object], key:string){
  return array.sort(function(a, b)
 {
  let x = a[key];
  let y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}

function sortMin(array:[object], key:string){
  return array.sort(function(a, b)
 {
  let x = a[key];
  let y = b[key];
  return ((x > y) ? -1 : ((x < y) ? 1 : 0));
 });
}
