import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuratPesanan, SuratPesananItem } from '../models/surat-pesanan.model';
import { SuratPesananMockService } from './surat-pesanan-mock.service';
import { environment } from '../../environments/environment';

// API Response interfaces
interface SuratPesananApiResponse {
    statusCode: string;
    message: string;
    data: {
        spId: number;
        fakturSp: string;
        tglFakturSp: string;
        noSeriLembarManualSp: string;
        kodeCustomer: string;
        namaCustomer: string;
        userEntry: number;
        userNameEntry: string;
        items: SuratPesananItemApi[];
    };
}

interface SuratPesananItemApi {
    spId: number;
    spDetailId: number;
    noUrut: number;
    kodeBarang: string;
    namaBarang: string;
    panjang: number;
    qtyAkanDiProduksi: number;
    jumlah: number;
    notesPrinting: string | null;
}

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

        return this.http.get<SuratPesananApiResponse>(
            `${this.apiUrl}/PrintSuratPesanan/GetSuratPesananBySpId/${id}`
        ).pipe(
            map(response => this.mapApiResponseToModel(response))
        );
    }

    private mapApiResponseToModel(response: SuratPesananApiResponse): SuratPesanan {
        const data = response.data;

        return {
            id: data.spId.toString(),
            nomorSP: data.noSeriLembarManualSp,
            tanggal: new Date(data.tglFakturSp),
            konsumen: data.namaCustomer,
            nomorKonsumen: data.kodeCustomer,
            noDoc: "",
            terbit: undefined, // Not available in API
            rev: undefined, // Not available in API
            items: data.items.map(item => this.mapItemApiToModel(item)),
            keterangan: undefined, // Not available in API
            createdBy: data.userNameEntry,
            createdAt: new Date(data.tglFakturSp)
        };
    }

    private mapItemApiToModel(item: SuratPesananItemApi): SuratPesananItem {
        return {
            no: item.noUrut,
            kodeBarang: item.kodeBarang,
            namaBarang: item.namaBarang,
            pjg: item.panjang,
            qty: item.qtyAkanDiProduksi,
            jumlah: item.jumlah,
            notesPrinting: item.notesPrinting || undefined
        };
    }
}
