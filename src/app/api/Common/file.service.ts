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
  async updateEditedImage(image: ImageDto) {
    try {
      const response = await this.http
        .post<SaveImageResponse>(this.fileUrl + 'update-image', image)
        .toPromise();

      return response?.Message ?? '';
    } catch (error) {
      console.error('Error removing image', error);
      throw error;
    }
  }
  fileUrl: string = this.baseUrl + 'File/';

  constructor(private http: HttpClient) {
    super();
  }

  getImages(): Observable<ImageDto[]> {
    // Update the return type to ImageDto[]
    return this.http.get<ImageDto[]>(this.fileUrl + 'get-image-all'); // Update the response type to ImageDto[]
  }
  async remove(data: ImageDto[]) {
    try {
      const response = await this.http
        .post<SaveImageResponse>(this.fileUrl + 'remove-image', data)
        .toPromise();

      return response?.Message ?? '';
    } catch (error) {
      console.error('Error removing image', error);
      throw error;
    }
  }
  uploadFile(data: any): Observable<ImageDto[]> {
    return this.http.post<ImageDto[]>(this.fileUrl + 'upload-image', data).pipe(
      catchError((error: any) => {
        console.error('Upload failed:', error);
        return [];
      })
    );
  }
}

interface SaveImageResponse {
  Message: string;
}
