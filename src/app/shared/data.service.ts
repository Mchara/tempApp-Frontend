import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${environment.backendUrl}/upload`, formData);
  }

  getYearlyAvgAndStd(): Observable<any> {
    return this.http.get(`${environment.backendUrl}/get_yearly_avg_and_std`);
  }

  getDataForYear(year: number): Observable<any> {
    return this.http.get(`${environment.backendUrl}/get_data_for_year/${year}`);
  }

  getPlot(viewType: string = 'montly', processedData: any[]): Observable<Blob> {
    return this.http.post(
      `${environment.backendUrl}/plot`,
      { viewType, processedData },
      { responseType: 'blob' }
    );
  }

  getYearlyPlotWithoutDeviation(processedData: any[]): Observable<Blob> {
    return this.http.post(
      `${environment.backendUrl}/plot_yearly_without_deviation`,
      processedData,
      { responseType: 'blob' }
    );
  }
}
