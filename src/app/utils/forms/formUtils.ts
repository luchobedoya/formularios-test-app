import { FormArray, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils {
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
            switch (error) {
                case 'required':
                    return 'Este campo es requerido';
                case 'minlength':
                    return `Este campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;
                case 'min':
                    return `Este campo debe tener un valor minimo de ${errors['min'].min}`;
                default:
                    return 'Este campo es invalido';
            }
        }
        return null;
    }

    static isFieldOneTouched(form: FormGroup, field: string) {
        return form.get(field)?.touched;
    }

}