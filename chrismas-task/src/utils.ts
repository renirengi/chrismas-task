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
