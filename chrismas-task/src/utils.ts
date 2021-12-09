export function elementShowOrHide(element:HTMLBodyElement, text:string) {
  if(element.textContent===text){
    element.style.display = 'none';
  }
  else{
    element.style.display = 'block';
  }

  }

