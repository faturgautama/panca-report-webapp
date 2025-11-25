import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuratPesanan } from '../models/surat-pesanan.model';
import { SuratPesananMockService } from './surat-pesanan-mock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuratPesananService {
    private http = inject(HttpClient);
    private mockService = inject(SuratPesananMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getSuratPesananById(id: string): Observable<SuratPesanan> {
        if (this.useMock) {
            return this.mockService.getSuratPesananById(id);
        }
        return this.http.get<SuratPesanan>(`${this.apiUrl}/surat-pesanan/${id}`);
    }
}
