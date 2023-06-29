import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import {
  PropertyContractI,
  PropertyContractResponseI,
} from '@core/interfaces/property';
import { LeaseInventoryService } from '@modules/lease-form/services/lease-inventory.service';

@Component({
  selector: 'app-information-lease',
  templateUrl: './information-lease.component.html',
  styleUrls: ['./information-lease.component.css'],
})
export class InformationLeaseComponent implements OnInit {
  @Input() public parentLeaseForm!: FormGroup;
  @Input() public properties: any = [];

  public insurers = [
    { label: 'Seguros Mundial', value: 1, disabled: false },
    { label: 'Libertador', value: 2, disabled: false },
    { label: 'Directo', value: 3, disabled: false },
    { label: 'Otro', value: 0, disabled: false },
  ];

  constructor(
    private _leaseInventoryService: LeaseInventoryService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.handleChangesParentLeaseForm();
  }

  get getDateLessee(): Date {
    return this.parentLeaseForm.get('dateLessee')?.value || new Date();
  }

  get getDateLessor(): boolean {
    let today = new Date();
    let value = new Date(this.parentLeaseForm.get('dateLessor')?.value);
    if (today.toDateString() === value.toDateString()) return true;
    return false;
  }

  handleChangesParentLeaseForm(): void {
    const nameInsuranceCompany = this.parentLeaseForm.get(
      'nameInsuranceCompany'
    );
    this.parentLeaseForm.get('insuranceCompany')?.valueChanges.subscribe({
      next: value => {
        if (value !== 0) {
          nameInsuranceCompany?.clearValidators();
          nameInsuranceCompany?.updateValueAndValidity();
          nameInsuranceCompany?.setValue('');
        } else {
          nameInsuranceCompany?.setValidators(Validators.required);
        }
      },
    });
  }

  setValuesInParentLeaseForm(): void {
    this._leaseInventoryService.getPropertyDetail.subscribe({
      next: (response: PropertyContractI) => {
        const {
          direccion,
          tipo_inmueble,
          habitaciones,
          bano_servicio,
          banos,
          parqueaderos,
          balcon,
        } = response;

        const addressFormControl = this.parentLeaseForm.get('address');
        const typePropertyFormControl =
          this.parentLeaseForm.get('typeProperty');
        const bathroomsFormControl = this.parentLeaseForm.get('bathrooms');
        const bedroomsFormControl = this.parentLeaseForm.get('bedrooms');
        const garagesFormControl = this.parentLeaseForm.get('garages');
        const balconyFormControl = this.parentLeaseForm.get('balcony');

        addressFormControl?.setValue(direccion);
        typePropertyFormControl?.setValue(tipo_inmueble);
        bano_servicio
          ? bathroomsFormControl?.setValue((banos || 0) - 1)
          : bathroomsFormControl?.setValue(banos);
        bedroomsFormControl?.setValue(habitaciones);
        garagesFormControl?.setValue(parqueaderos);
        balcon
          ? balconyFormControl?.setValue('Si')
          : balconyFormControl?.setValue('No');
        // this.buildGaragesForm();
      },
    });
  }

  onSelectPropertyCode() {
    const codigo = this.parentLeaseForm.get('contractNumber')?.value;
    if (codigo !== null) {
      this._leaseInventoryService.propertyContractApi(codigo).subscribe({
        next: (res: PropertyContractResponseI) => {
          const { inmueble } = res;
          this._leaseInventoryService.setPropertyDetail = inmueble;
        },
      });
      this.setValuesInParentLeaseForm();
    }
  }

  buildGaragesForm() {
    const garagesForm: FormArray = this._fb.array([]);
    let garagesArray = [];
    let length = this.parentLeaseForm.get('garages')?.value;
    for (let i = 0; i < length; i++) {
      garagesArray.push(1);
    }
    garagesArray.map(garage => {
      garagesForm.push(this.initBuildGaragesForm());
    });
    this.parentLeaseForm?.setControl('garagesSpaces', garagesForm);
  }

  initBuildGaragesForm(): FormGroup {
    return new FormGroup({
      nameGarage: new FormControl('', [Validators.required]),
      descsGarage: new FormGroup({}),
    });
  }

  get contractNumber() {
    return this.parentLeaseForm.get('contractNumber');
  }

  get dateLessee() {
    return this.parentLeaseForm.get('dateLessee');
  }

  get dateLessor() {
    return this.parentLeaseForm.get('dateLessor');
  }

  get lessee() {
    return this.parentLeaseForm.get('lessee');
  }

  get insuranceCompany() {
    return this.parentLeaseForm.get('insuranceCompany');
  }

  get nameInsuranceCompany() {
    return this.parentLeaseForm.get('nameInsuranceCompany');
  }
}
