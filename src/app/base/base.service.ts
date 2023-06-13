import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public baseUrl: string = 'https://localhost:7278/';
  constructor() {}
}
