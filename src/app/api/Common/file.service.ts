import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
  providedIn: 'root',
})
export class FileService extends BaseService {
  fileUrl: string = this.baseUrl + 'File/';

  constructor(private http: HttpClient) {
    super();
  }
  async uploadFile(file: File, fileName: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, fileName);

    const response = await this.http
      .post<string>(this.fileUrl + 'save-image', formData)
      .toPromise();

    return response || '';
  }
}
