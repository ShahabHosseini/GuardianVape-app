import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/base.service';
import { Observable } from 'rxjs';
import { ImageDto } from 'src/app/Model/image-dto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileService extends BaseService {
  fileUrl: string = this.baseUrl + 'File/';

  constructor(private http: HttpClient) {
    super();
  }

  getImages(): Observable<ImageDto[]> {
    // Update the return type to ImageDto[]
    return this.http.get<ImageDto[]>(this.fileUrl + 'get-image-all'); // Update the response type to ImageDto[]
  }

  async uploadFile(data: any): Promise<string | never> {
    try {
      const response = await this.http
        .post<SaveImageResponse>(this.fileUrl + 'upload-image', data)
        .toPromise();

      return response?.Message ?? '';
    } catch (error) {
      console.error('Error saving image', error);
      throw error;
    }
  }
}

interface SaveImageResponse {
  Message: string;
}
