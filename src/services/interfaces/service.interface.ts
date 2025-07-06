import { ServiceVersion } from './serviceVersion.interface';

export interface Service {
  id: string;
  name: string;
  description: string;
  versions: ServiceVersion[];
  createdAt?: Date;
  updatedAt?: Date;
}
