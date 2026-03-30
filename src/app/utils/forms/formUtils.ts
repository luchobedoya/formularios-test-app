import { FormGroup } from "@angular/forms";

export class FormUtils {
    static isValidField( form: FormGroup, field: string ): boolean {
        return !!(form.get(field)?.errors && form.get(field)?.touched);
    } 

    static getFieldError(form: FormGroup, field: string) {
        if (!form.get(field)) return;

        const errors = form.get(field)?.errors ?? {};

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
}