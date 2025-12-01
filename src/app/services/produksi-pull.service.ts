import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOKeluarBahanBaku, ProduksiPull, ProduksiPullReport, DOItem, ProduksiItem } from '../models/produksi-pull.model';
import { ProduksiPullMockService } from './produksi-pull-mock.service';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';

// API Response interfaces
interface ProduksiPullApiResponse {
    statusCode: string;
    message: string;
    data: {
        produksiPullId: number;
        fakturProduksi: string;
        tglMulaiProduksi: string;
        tglSelesaiProduksi: string;
        keterangan: string;
        userNameEntry: string;
        waktuEntry: string;
        userNameValidasi: string;
        waktuValidasi: string;
        items: ProduksiItemApi[];
    };
}

interface ProduksiItemApi {
    produksiPullId: number;
    produksiPullDetailId: number;
    jenis: string;
    noKoil: string;
    beratKoil: number;
    lebar: number;
    tebal: number;
    profil: string;
    lembar: number;
    panjang: number;
    hasil: string;
}

interface DOKeluarBahanBakuApiResponse {
    statusCode: string;
    message: string;
    data: {
        doKeluarBahanProduksiPullId: number;
        fakturDoKeluarBahanProduksiPull: string;
        tglDoKeluarBahanProduksiPull: string;
        fakturProduksi: string;
        userNameEntry: string;
        waktuEntry: string;
        items: DOKeluarItemApi[];
    };
}

interface DOKeluarItemApi {
    doKeluarBahanProduksiPullId: number;
    doKeluarBahanProduksiPullDetailId: number;
    noUrut: number;
    noKoil: string;
    kodeBahan: string;
    namaBahan: string;
    jumlah: number;
}

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
            produksi: this.http.get<ProduksiPullApiResponse>(`${this.apiUrl}/PrintProduksi/GetProduksiPullByProduksiPullId/${id}`),
            doKeluar: this.http.get<DOKeluarBahanBakuApiResponse>(`${this.apiUrl}/PrintProduksi/GetDoKeluarBahanBakuByProduksiPullId/${id}`)
        }).pipe(
            map(responses => ({
                catatanProduksi: this.mapProduksiPullToModel(responses.produksi),
                doKeluarBahanBaku: this.mapDOKeluarToModel(responses.doKeluar)
            }))
        );
    }

    private mapProduksiPullToModel(response: ProduksiPullApiResponse): ProduksiPull {
        const data = response.data;
        const tglProduksi = new Date(data.tglMulaiProduksi);

        return {
            noProduksi: data.fakturProduksi,
            tglProduksi: tglProduksi,
            operator: data.userNameEntry,
            halaman: 1, // Default value
            tanggalHalaman: tglProduksi,
            items: data.items.map(item => this.mapProduksiItemToModel(item))
        };
    }

    private mapProduksiItemToModel(item: ProduksiItemApi): ProduksiItem {
        return {
            noCoil: item.noKoil,
            jenis: item.jenis,
            beratKoil: item.beratKoil,
            lebar: item.lebar,
            swgTebal: item.tebal,
            type: item.profil,
            lembar: item.lembar,
            panjang: item.panjang,
            hasil: item.hasil,
            parafOperator: '' // Not in API
        };
    }

    private mapDOKeluarToModel(response: DOKeluarBahanBakuApiResponse): DOKeluarBahanBaku {
        const data = response.data;
        const waktuEntry = new Date(data.waktuEntry);

        return {
            noDO: data.fakturDoKeluarBahanProduksiPull,
            tanggal: new Date(data.tglDoKeluarBahanProduksiPull),
            noSP: data.fakturProduksi,
            items: data.items.map(item => this.mapDOKeluarItemToModel(item)),
            timestamp: format(waktuEntry, 'HH:mm:ss'),
            user: data.userNameEntry
        };
    }

    private mapDOKeluarItemToModel(item: DOKeluarItemApi): DOItem {
        return {
            no: item.noUrut,
            kodeKoil: item.noKoil,
            kodeBarang: item.kodeBahan,
            namaBarang: item.namaBahan,
            jumlah: item.jumlah
        };
    }
}
