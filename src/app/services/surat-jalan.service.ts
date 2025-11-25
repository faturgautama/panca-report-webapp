import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuratJalan } from '../models/surat-jalan.model';
import { SuratJalanMockService } from './surat-jalan-mock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuratJalanService {
    private http = inject(HttpClient);
    private mockService = inject(SuratJalanMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getSuratJalanById(id: string, type: 'PUS1' | 'PUS2'): Observable<SuratJalan> {
        if (this.useMock) {
            return this.mockService.getSuratJalanById(id, type);
        }
        return this.http.get<SuratJalan>(`${this.apiUrl}/surat-jalan/${type.toLowerCase()}/${id}`);
    }
}
