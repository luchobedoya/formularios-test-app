import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
    return new Promise(
        resolve => setTimeout(() => resolve(true), 3000)
    )
}

export class FormUtils {
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  
    static isValidField( form: FormGroup, field: string ): boolean {
        return !!(form.get(field)?.errors && form.get(field)?.touched);
    } 

    static isValidFieldAdd( form: FormControl ): boolean {
        return !!(form.errors && form.touched);
    } 

    static getFieldError(form: FormGroup, field: string) {
        if (!form.get(field)) return;
        const errors = form.get(field)?.errors ?? {};
        return this.getTextError(errors);
    }

    static isValidFieldInArray(formArray: FormArray, index: number) {
        return formArray.controls[index].invalid && formArray.controls[index].touched && formArray.controls[index].errors;
    }

    // static getFieldErrorInArray(formArray: FormArray, index: number) {
    //     return formArray.controls.length ? formArray.controls[index].errors : null;
    // }   

    static getFieldErrorInArray(form: FormArray, index: number) {
        console.log(form.controls[index]);
        if (!form.controls[index]) return;
        const errors = form.controls[index].errors ?? {};
        return this.getTextError(errors);
    }

    static getTextError(errors: ValidationErrors) {
        for (const error of Object.keys(errors)) {
            console.log(error);
            switch (error) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Este campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `Este campo debe tener un valor minimo de ${errors['min'].min}`;
                case 'email':
                    return `El valor ingresado no es un correo electeronico`;
                case 'notStrider':
                    return `No se puede usar el valor strider en la app`;
                default:
                    return 'Este campo es invalido';
            }
        }
        return null;
    }

    static isFieldOneTouched(form: FormGroup, field: string) {
        return form.get(field)?.touched;
    }

    static isFieldOneEqualFieldTwo( field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      if (field1Value !== field2Value) {
        return {
          passwordNotMatch: true
        }
      }
      return null;
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('validando contra el servidor');
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@hola.com') {
        return {
            emailTaken: true
        }
    }
    return null; 
  }


  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value.toLowerCase();
    if (value === 'strider') {
        return {
            notStrider: true
        }
    }
    return null; 
  }

}