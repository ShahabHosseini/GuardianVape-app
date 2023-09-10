import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDto } from 'src/app/Model/country-dto';
import { ImageDto } from 'src/app/Model/image-dto';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  commonUrl: string = this.baseUrl + 'common/';

  constructor(private http: HttpClient) {
    super();
  }
  public newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  convertImageToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  getAllCountry(): Observable<CountryDto[]> {
    // Update the return type to ImageDto[]
    return this.http.get<CountryDto[]>(this.commonUrl + 'get-all-country'); // Update the response type to ImageDto[]
  }
}
