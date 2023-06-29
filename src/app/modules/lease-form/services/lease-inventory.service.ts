import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  PropertyContractI,
  PropertyContractResponseI,
  PropertiesI,
  PropertiesResponseI,
} from '@core/interfaces/property';

@Injectable({
  providedIn: 'root',
})
export class LeaseInventoryService {
  private readonly urlAPIBase = environment.urlAPI;

  public descriptionsOfFeatures = [
    {
      label: 'Entrada principal',
      descs: [{ value: 'Puerta principal' }, { value: 'Cerradura puerta' }],
    },
    {
      label: 'Cocina',
      descs: [
        { value: 'Puerta' },
        { value: 'Cerradura' },
        { value: 'Ventanas' },
        { value: 'Vidrios' },
      ],
    },
    {
      label: 'Elementos electricos',
      descs: [
        { value: 'Teléfonos' },
        { value: 'Citófonos' },
        { value: 'Contador de luz' },
        { value: 'Caja de fusibles' },
      ],
    },
    {
      label: 'Habitación',
      descs: [{ value: 'Puerta' }, { value: 'Cerradura' }],
    },
    {
      label: 'Baño',
      descs: [{ value: 'Puerta' }, { value: 'Cerradura' }],
    },
    {
      label: 'Garaje',
      descs: [
        { value: 'Puerta' },
        { value: 'Cerradura' },
        { value: 'Rejas' },
        { value: 'Pisos' },
        { value: 'Tomas televisión' },
        { value: 'Interruptores' },
        { value: 'Rosetas' },
        { value: 'Lámparas' },
        { value: 'Bombillos' },
        { value: 'Guarda escobas' },
        { value: 'Closet' },
        { value: 'Puertas' },
        { value: 'Entrepaños' },
        { value: 'Cajones' },
      ],
    },
    {
      label: 'Deposito',
      descs: [
        { value: 'Puerta' },
        { value: 'Cerradura' },
        { value: 'Rejas' },
        { value: 'Pisos' },
        { value: 'Tomas televisión' },
        { value: 'Interruptores' },
        { value: 'Rosetas' },
        { value: 'Lámparas' },
        { value: 'Bombillos' },
        { value: 'Guarda escobas' },
        { value: 'Closet' },
        { value: 'Puertas' },
        { value: 'Entrepaños' },
        { value: 'Cajones' },
      ],
    },
  ];
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private propertyObs: BehaviorSubject<PropertyContractI> =
    new BehaviorSubject<PropertyContractI>({});
  private propertiesObs: BehaviorSubject<PropertiesI[]> = new BehaviorSubject<
    PropertiesI[]
  >([]);
  private spacesObs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'Entrada principal',
    'Elementos electricos',
  ]);
  constructor(private _htttpClient: HttpClient) {}

  propertyContractApi(codigo: string) {
    return this._htttpClient.get<PropertyContractResponseI>(
      this.urlAPIBase + 'inmueble-contract/' + codigo,
      this.httpOptions
    );
  }

  get getPropertyDetail() {
    return this.propertyObs.asObservable();
  }

  set setPropertyDetail(inmueble: PropertyContractI) {
    this.propertyObs.next(inmueble);
  }

  propertiesApi() {
    return this._htttpClient.get<PropertiesResponseI>(
      this.urlAPIBase + 'inmuebles/',
      this.httpOptions
    );
  }

  get getProperties() {
    return this.propertiesObs.asObservable();
  }

  set setProperties(inmuebles: PropertiesI[]) {
    this.propertiesObs.next(inmuebles);
  }

  saveLeasingContractApi(form: any) {
    const url: string = `${this.urlAPIBase}inmuebles/`;
    return this._htttpClient.post(url, form, this.httpOptions);
  }

  get getSpaces() {
    return this.spacesObs.asObservable();
  }

  set setSpaces(spaces: string[]) {
    this.spacesObs.next(spaces);
  }
}
