import { IAttribute } from './Attribute';
import { IClient } from './Client';

export interface IRequest extends IAttribute {
  name: string;
  type: string;
  client: IClient;
  isFinished: boolean;
  observation: string;
  answer: string;
  answeredAt: string;
}

export interface IRequestList {
  requests: IRequest[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  totalThisPage: number;
}
