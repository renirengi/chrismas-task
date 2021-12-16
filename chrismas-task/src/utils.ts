export function changeVisibility(text:string){
  const buttonElement: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.active');
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
