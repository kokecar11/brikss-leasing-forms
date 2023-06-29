import { FormControl, FormGroup, Validators } from '@angular/forms';
export default class Utils {
  static initBuildFeaturesSpaceForm(
    value: string,
    disabled: boolean = false
  ): FormGroup {
    return new FormGroup({
      description: new FormControl({ value, disabled }, [Validators.required]),
      cant: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      typeMaterial: new FormControl('', Validators.required),
      stateLessee: new FormControl('B', Validators.required),
      obsLessee: new FormControl(''),
    });
  }
}
