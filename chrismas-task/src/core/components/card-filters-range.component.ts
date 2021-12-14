import noUiSlider from 'nouislider';

export function makeCountRange(){
  const countSlider = (document.querySelector('.count-slider')) as HTMLElement;
   noUiSlider.create(countSlider, {
   start: [1, 12],
   snap: true,
   connect: true,
   behaviour: 'drag',
   range: {
       'min': 1,
       '9.1%': 2,
       '18.2%': 3,
       '27.3%': 4,
       '36.4%': 5,
       '45.5%': 6,
       '54.6%': 7,
       '63.7%': 8,
       '72.8%': 9,
       '81.9%': 10,
       '91%': 11,
       'max': 12
   }
});
}

export function  makeYearRange(){
  const yearSlider = (document.querySelector('.year-slider')) as HTMLElement;
   noUiSlider.create(yearSlider, {
   start: [1940, 2020],
   snap: true,
   connect: true,
   behaviour: 'drag',
   range: {
       'min': 1940,
       '10%': 1948,
       '20%': 1956,
       '30%': 1964,
       '40%': 1972,
       '50%': 1980,
       '60%': 1988,
       '70%': 1996,
       '80%': 2004,
       '90%': 2012,
       'max': 2020
   }
});
}
export function changeOutputValue(className:string){
  const elemIdMin=document.getElementById(`${className}-min`) as HTMLElement;
  const elemIdMax=document.getElementById(`${className}-max`) as HTMLElement;
  elemIdMin.innerHTML = getOutputValue(0, className);
  elemIdMax.innerHTML = getOutputValue(1, className);
}

 function getOutputValue(i:number, className:string){
  const elemSlider = document.querySelector(`.${className}-slider`) as HTMLElement;
  const positionsArray=elemSlider.noUiSlider.get();
  const minStringNumber=+positionsArray[i];
  console.log();
  return minStringNumber.toString();

}


