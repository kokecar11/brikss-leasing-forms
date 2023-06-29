import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { LeaseInventoryService } from '@modules/lease-form/services/lease-inventory.service';
import { ConfirmationService } from 'primeng/api';
import { PropertiesI, PropertiesResponseI } from '@core/interfaces/property';

@Component({
  selector: 'app-lease-form',
  templateUrl: './lease-form.component.html',
  providers: [ConfirmationService],
})
export class LeaseFormComponent implements OnInit {
  public parentLeaseForm: FormGroup = new FormGroup({});
  public spaces: string[] = [
    'Entrada principal',
    'Elementos electricos',
    'Cocina',
  ];
  public isDisabled: boolean = false;
  public isDisplayedMessage: boolean = false;
  public titleOfMessage: string = 'sin titulo';
  public descOfMessage: string = 'sin desc';

  public featuresFormLesseeCreated: boolean = false;
  public featuresFormLessorCreated: boolean = false;

  public indexOfTabView: number = 0;

  public properties: any = [];

  public properties$: Observable<PropertiesI[]>;

  public descTest: any = [];

  public insurers = [
    { label: 'Seguros Mundial', value: 1, disabled: false },
    { label: 'Libertador', value: 2, disabled: false },
    { label: 'Directo', value: 3, disabled: false },
    { label: 'Otro', value: 0, disabled: false },
  ];

  constructor(
    private _leaseInventoryService: LeaseInventoryService,
    private _fb: FormBuilder,
    private _confirmationService: ConfirmationService
  ) {
    _leaseInventoryService.propertiesApi().subscribe({
      next: (res: PropertiesResponseI) => {
        const { inmuebles } = res;
        _leaseInventoryService.setProperties = inmuebles;
      },
    });
    this.properties$ = _leaseInventoryService.getProperties;
    this.initBuildParentLeaseForm();
  }

  ngOnInit(): void {
    this.properties$.subscribe({
      next: res => {
        this.properties = res;
      },
    });
    // this.buildFormWithFeaturesLessee();
  }

  initBuildParentLeaseForm(): void {
    this.parentLeaseForm = new FormGroup({
      contractNumber: new FormControl('', Validators.required),
      dateLessee: new FormControl('', Validators.required),
      dateLessor: new FormControl('', Validators.required),
      lessee: new FormControl('', [Validators.required]),
      lessor: new FormControl({ value: 'BRIKSS S.A.S', disabled: true }, [
        Validators.required,
      ]),
      insuranceCompany: new FormControl('', [Validators.required]),
      nameInsuranceCompany: new FormControl('', [Validators.required]),
      address: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      typeProperty: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      bedrooms: new FormControl({ value: 0, disabled: true }, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      bathrooms: new FormControl({ value: 0, disabled: true }, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      garages: new FormControl({ value: 0, disabled: true }, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      deposits: new FormControl({ value: 0, disabled: false }, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      balcony: new FormControl(
        { value: 'No', disabled: true },
        Validators.required
      ),
      terrace: new FormControl(
        { value: false, disabled: true },
        Validators.required
      ),
    });
  }
  //buildFormWithFeaturesLessee
  buildSpacesForm(): void {
    this.isDisabled = true;
    this.featuresFormLesseeCreated = true;

    const spacesForm: FormArray = this._fb.array([]);

    const bedrooms = Number(this.parentLeaseForm.get('bedrooms')?.value);
    const bathrooms = Number(this.parentLeaseForm.get('bathrooms')?.value);
    const deposits = Number(this.parentLeaseForm.get('deposits')?.value);
    const garages = Number(this.parentLeaseForm.get('garages')?.value);

    for (let i = 0; i < bedrooms; i++) {
      i === 0
        ? this.spaces.push(`Habitación principal`)
        : this.spaces.push(`Habitación ${i}`);
    }
    for (let i = 0; i < bathrooms; i++) {
      //TODO: if bathroom in the principal room
      i === 0
        ? this.spaces.push(`Baño principal`)
        : this.spaces.push(`Baño ${i}`);
    }
    for (let i = 0; i < deposits; i++) {
      this.spaces.push(`Deposito ${i + 1}`);
    }
    for (let i = 0; i < garages; i++) {
      this.spaces.push(`Garaje ${i + 1}`);
    }

    this.spaces.map(space => {
      const buildForm = this.initBuildSpaceForm(space.toString());
      spacesForm.push(buildForm);
    });

    this._leaseInventoryService.setSpaces = this.spaces;
    this.parentLeaseForm.setControl('spaces', spacesForm);
  }

  initBuildSpaceForm(valueName: string) {
    const featuresSpaceForm: FormArray = this._fb.array([]);

    const space = this.spaces.filter(space => space === valueName)[0];

    const desc = this._leaseInventoryService.descriptionsOfFeatures.filter(
      desc => desc.label.includes(space.split(' ')[0])
    );

    desc.map(desc => {
      const { descs, label } = desc;
      descs.map(desc => {
        featuresSpaceForm.push(
          this.initBuildFeaturesSpaceForm(desc.value, true)
        );
      });
      this.descTest.push({ label: space, descs: descs });
    });
    return new FormGroup({
      name: new FormControl(valueName),
      features: featuresSpaceForm,
    });
  }

  initBuildFeaturesSpaceForm(
    value: string,
    disabled: boolean = false
  ): FormGroup {
    const states = this._fb.group({
      delivered: new FormGroup({
        state: new FormControl('B', Validators.required),
        comments: new FormControl(''),
      }),
      received: new FormGroup({
        state: new FormControl('B', Validators.required),
        comments: new FormControl(''),
      }),
    });

    return new FormGroup({
      description: new FormControl({ value, disabled: true }, [
        Validators.required,
      ]),
      cant: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      material: new FormControl('', Validators.required),
      states: states,
    });
  }

  addFeaturesOfSpace(form: FormGroup): void {
    const refFeatures = form.get('features') as FormArray;
    // refFeatures.push(this.initFormFeaturesSpace('', false));
  }

  getForm(key: string, form: FormGroup): any {
    return form.get(key);
  }

  onSubmit() {
    this.buildSpacesForm();
    const form = JSON.stringify(this.parentLeaseForm.getRawValue());
    this._leaseInventoryService.getSpaces.subscribe(spaces => {
      console.log(spaces);
    });
  }

  openNext(): void {
    this.indexOfTabView =
      this.indexOfTabView === this.spaces.length ? 0 : this.indexOfTabView + 1;
  }

  openPrev(): void {
    this.indexOfTabView =
      this.indexOfTabView === 0 ? this.spaces.length : this.indexOfTabView - 1;
  }

  onConfirm() {
    this._confirmationService.confirm({
      message: '¿Está seguro de generar el inventario de entrega del inmueble?',
      accept: () => {
        this.onSubmit();
      },
      reject: () => {
        //TODO: create a function that will reject this request
      },
    });
  }
}
