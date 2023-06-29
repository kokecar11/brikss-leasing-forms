import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';

import Utils from '@shared/utils';

@Component({
  selector: 'app-information-property',
  templateUrl: './information-property.component.html',
  styleUrls: ['./information-property.component.css'],
})
export class InformationPropertyComponent {
  @Input() public parentLeaseForm!: FormGroup;

  public totalDeposits: number = 0;
  public totalGarages: number = 1;

  public depositsForm!: FormGroup;

  public depositSpaces = [
    { label: 'deposito 1', value: 'deposit_1', descs: [] },
  ];

  public categories = [
    {
      label: 'Sala (Independiente)',
      value: 1,
    },
    {
      label: 'Sala y Comedor',
      value: 2,
    },
    {
      label: 'Sala y Hall',
      value: 2,
    },
    {
      label: 'Sala, Comedor y Hall',
      value: 3,
    },
    {
      label: 'Sala, Comedor y Hall',
      value: 4,
    },
  ];

  constructor(private _fb: FormBuilder) {}

  onChangeDeposits() {
    const deposits = this.parentLeaseForm?.get('deposits')?.value;
    this.totalDeposits = deposits;
    // if (deposits >= 1) {
    //   this.buildDepositsForm(deposits);
    // }
  }

  get deposits() {
    return this.parentLeaseForm?.get('deposits');
  }

  buildDepositsForm(deposits: number) {
    const depositsForm: FormArray = this._fb.array([]);
    let depositArray = [];
    let length = deposits;
    for (let i = 0; i < length; i++) {
      depositArray.push(1);
    }
    depositArray.map(deposit => {
      depositsForm.push(this.initBuildDepositsForm());
    });
    this.parentLeaseForm?.setControl('depositsSpaces', depositsForm);
  }

  initBuildDepositsForm(): FormGroup {
    return new FormGroup({
      nameDeposit: new FormControl('', [Validators.required]),
      descsDeposit: new FormGroup({}),
      // example: Utils.initBuildFeaturesSpaceForm('', false),
    });
  }

  getForm(key: string, form: FormGroup): any {
    return form.get(key);
  }
}
