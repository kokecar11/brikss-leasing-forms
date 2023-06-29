export interface PropertyContractI {
  codigo?: string;
  tipo_inmueble?: string;
  direccion?: string;
  banos?: number;
  habitaciones?: number;
  parqueaderos?: number;
  terraza_privada?: boolean;
  balcon?: boolean;
  deposito?: boolean;
  estudio?: boolean;
  bano_servicio?: boolean;
}

export interface PropertyContractResponseI {
  inmueble: PropertyContractI;
}

export interface PropertiesI {
  codigo?: string;
}

export interface PropertiesResponseI {
  inmuebles: PropertiesI[];
}
