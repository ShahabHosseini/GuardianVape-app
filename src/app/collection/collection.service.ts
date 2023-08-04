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

  async save(data: CollectionDto): Promise<Observable<any>> {
    return this.http.post<CollectionDto>(
      `${this.collectionUrl}save-collection`,
      data
    );
  }
}
