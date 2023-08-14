import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IdTitleDto } from '../Model/id-title-dto';
import { Observable } from 'rxjs';
import { CollectionDto } from '../Model/collection-dto';

@Injectable({
  providedIn: 'root',
})
export class CollectionService extends BaseService {
  getParents(): Observable<CollectionDto[]> {
    return this.http.get<CollectionDto[]>(`${this.collectionUrl}get-parents/`);
  }
  getCollections(): Observable<CollectionDto[]> {
    return this.http.get<CollectionDto[]>(
      `${this.collectionUrl}get-collections/`
    );
  }
  collectionUrl: string = this.baseUrl + 'Collection/';

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  getAllConditionType(): Observable<IdTitleDto[]> {
    return this.http.get<IdTitleDto[]>(`${this.collectionUrl}condition-type/`);
  }

  getAllEqualType(): Observable<IdTitleDto[]> {
    return this.http.get<IdTitleDto[]>(`${this.collectionUrl}equal-type/`);
  }

  getCollection(guid: string): Observable<CollectionDto> {
    return this.http.post<CollectionDto>(
      `${this.collectionUrl}get-collection/${guid}`,
      {}
    );
  }
  async save(data: CollectionDto): Promise<Observable<any>> {
    console.log('Data before Save:', data);
    return this.http.post<CollectionDto>(
      `${this.collectionUrl}save-collection`,
      data
    );
  }
  async update(data: CollectionDto): Promise<Observable<any>> {
    return this.http.post<CollectionDto>(
      `${this.collectionUrl}update-collection`,
      data
    );
  }
}
