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
  const snowButton = document.getElementById('snow') as HTMLElement;
  snowButton.addEventListener("click", () => {
    if(snowButton.classList.contains('snowflake')){
      removeSnow();
      snowButton.classList.remove('snowflake')
    }
    else{
      makeSnow(container, 'snow1');
      makeSnow(container, 'snow2');
      snowButton.classList.add('snowflake')

    }
  });
}

function makeSnow(container:HTMLElement,className:string){
  const snow = document.createElement('div');
  snow.classList.add(className);
  container.prepend(snow);
}

function removeSnow(){
 const item1= document.querySelector('.snow1') as HTMLElement;
 const item2= document.querySelector('.snow2') as HTMLElement;
 item1.parentNode?.removeChild(item1);
 item2.parentNode?.removeChild(item2);


}
