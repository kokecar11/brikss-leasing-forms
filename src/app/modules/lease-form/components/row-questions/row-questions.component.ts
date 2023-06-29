import { FormGroup, FormArray } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-row-questions]',
  templateUrl: './row-questions.component.html',
  styleUrls: ['./row-questions.component.css'],
})
export class RowQuestionsComponent {
  @Input() public formParent!: FormGroup;
  @Input() public descriptions: any[] = [];

  @Input() public formSpace!: FormGroup;
  @Input() public index!: number;

  @Input() public formTestDeliverd!: FormGroup;

  public selectedDesc: string = 'puertaPrincipal';

  public stateLessor: string = 'R';
  public stateLessee: string = 'R';

  public obsLessor: string = '';
  public obsLessee: string = '';

  public states: any[] = [
    { name: 'Bueno', key: 'B' },
    { name: 'Regular', key: 'R' },
    { name: 'Malo', key: 'M' },
  ];

  public statesTest: string[] = ['Bueno', 'Regular', 'Malo'];

  constructor() {}
  removeFeaturesOfSpaces(): void {
    const refFeatures = this.formSpace.get('features') as FormArray;
    refFeatures.removeAt(this.index);
  }
  getForm(key: string, form: FormGroup): any {
    return form.get(key);
  }
}
