export function changeVisibility(text:string){
  const buttonElement: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.check');
  buttonElement.forEach((element) => {
    if(element.textContent===text){
      element.style.display = 'none';
    }
    else{
      element.style.display = 'block';
    }
  })
}

export function isNil(value: unknown) {
  return value === null || value === undefined;
}

export function removeContainer(container:HTMLElement){
  const buttonsElements = document.querySelectorAll('.check') as NodeListOf<HTMLElement>;
  buttonsElements.forEach((el)=>el.addEventListener('click', () => container.innerHTML=" "));
  }

export function changeSnow(container:HTMLElement){
  const snowButton = document.querySelector('.snow-button') as HTMLElement;
  snowButton.addEventListener("click", () => {
    if(snowButton.classList.contains('snowflakeice')){
      removeSnow();
      snowButton.classList.remove('snowflakeice')
    }
    else{
      makeSnow(container, 'snow3');
      makeSnow(container, 'snow4');
      snowButton.classList.add('snowflakeice')
    }
  });
}
function makeSnow(container:HTMLElement,className:string){
    const snow = document.createElement('div');
    snow.classList.add(className);
    container.prepend(snow);
  }
  function removeSnow(){
    const item1= document.querySelector('.snow3') as HTMLElement;
    const item2= document.querySelector('.snow4') as HTMLElement;
    item1.parentNode?.removeChild(item1);
    item2.parentNode?.removeChild(item2);
   }


export function changeSnowGame(container:HTMLElement){
  const snowButton = document.querySelector('.snow-game-button') as HTMLElement;
  snowButton.addEventListener("click", () => {
    if(snowButton.classList.contains('snowflake')){
      removeSnowGame();
      snowButton.classList.remove('snowflake')
    }
    else{
      makeSnowGame(container, 'snow1');
      makeSnowGame(container, 'snow2');
      snowButton.classList.add('snowflake')

    }
  });
}

function makeSnowGame(container:HTMLElement,className:string){
  const snow = document.createElement('div');
  snow.classList.add(className);
  container.prepend(snow);
}


function removeSnowGame(){
 const item1= document.querySelector('.snow1') as HTMLElement;
 const item2= document.querySelector('.snow2') as HTMLElement;
 item1.parentNode?.removeChild(item1);
 item2.parentNode?.removeChild(item2);
}






