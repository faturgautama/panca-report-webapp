import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOKeluarBahanBaku, DOMasukBarangJadi, CatatanProduksiWIP, ProduksiWIPReport } from '../models/produksi-wip.model';
import { ProduksiWIPMockService } from './produksi-wip-mock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProduksiWIPService {
    private http = inject(HttpClient);
    private mockService = inject(ProduksiWIPMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getProduksiWIPReport(id: string): Observable<ProduksiWIPReport> {
        if (this.useMock) {
            return this.mockService.getProduksiWIPReport(id);
        }

        // Fetch 3 API sekaligus menggunakan forkJoin
        return forkJoin({
            doKeluar: this.http.get<DOKeluarBahanBaku>(`${this.apiUrl}/do-keluar-bahan-baku-wip/${id}`),
            doMasuk: this.http.get<DOMasukBarangJadi>(`${this.apiUrl}/do-masuk-barang-jadi-wip/${id}`),
            catatan: this.http.get<CatatanProduksiWIP>(`${this.apiUrl}/catatan-produksi-wip/${id}`)
        }).pipe(
            map(data => ({
                doKeluarBahanBaku: data.doKeluar,
                doMasukBarangJadi: data.doMasuk,
                catatanProduksi: data.catatan
            }))
        );
    }
}
