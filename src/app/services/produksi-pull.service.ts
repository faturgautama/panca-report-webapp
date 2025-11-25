import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOKeluarBahanBaku, ProduksiPull, ProduksiPullReport } from '../models/produksi-pull.model';
import { ProduksiPullMockService } from './produksi-pull-mock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProduksiPullService {
    private http = inject(HttpClient);
    private mockService = inject(ProduksiPullMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getProduksiPullReport(id: string): Observable<ProduksiPullReport> {
        if (this.useMock) {
            return this.mockService.getProduksiPullReport(id);
        }

        // Fetch 2 API sekaligus menggunakan forkJoin
        return forkJoin({
            doKeluar: this.http.get<DOKeluarBahanBaku>(`${this.apiUrl}/do-keluar-bahan-baku/${id}`),
            produksi: this.http.get<ProduksiPull>(`${this.apiUrl}/produksi-pull/${id}`)
        }).pipe(
            map(data => ({
                doKeluarBahanBaku: data.doKeluar,
                catatanProduksi: data.produksi
            }))
        );
    }
}
