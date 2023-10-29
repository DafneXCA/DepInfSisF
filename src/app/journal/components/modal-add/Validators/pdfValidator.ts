import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pdfValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file=control.value;
      if(file){
        const isPdf=file.toLocaleLowerCase().endsWith('.pdf');   
        return isPdf? null : {pdfValidator:true};
      }
      return null;
    };
  }