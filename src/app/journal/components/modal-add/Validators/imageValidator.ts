import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function imageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const image=control.value;
      if(image){
        const isImage=image.toLocaleLowerCase().endsWith('.png') || image.toLocaleLowerCase().endsWith('.jpg') || image.toLocaleLowerCase().endsWith('.jpeg');   
        return isImage? null : {imageValidator:true};
      }
      return null;
    };
  }