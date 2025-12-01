import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DOKeluarBahanBaku, DOMasukBarangJadi, CatatanProduksiWIP, ProduksiWIPReport, DOItem, DOMasukItem, CatatanProduksiItem } from '../models/produksi-wip.model';
import { ProduksiWIPMockService } from './produksi-wip-mock.service';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';

// API Response interfaces
interface CatatanProduksiWIPApiResponse {
    statusCode: string;
    message: string;
    data: {
        produksiWipId: number;
        fakturProduksi: string;
        tglFakturProduksi: string;
        tglMulaiProduksi: string;
        tglSelesaiProduksi: string;
        noLembarManual: string;
        keterangan: string;
        userNameEntry: string;
        waktuEntry: string;
        userNameValidasi: string;
        waktuValidasi: string;
        items: CatatanProduksiItemApi[];
    };
}

interface CatatanProduksiItemApi {
    produksiWipId: number;
    produksiWipDetailId: number;
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
        doKeluarBahanProduksiWipId: number;
        fakturDoKeluarBahanProduksiWip: string;
        tglDoKeluarBahanProduksiWip: string;
        noLembarManual: string;
        userNameEntry: string;
        waktuEntry: string;
        items: DOKeluarItemApi[];
    };
}

interface DOKeluarItemApi {
    doKeluarBahanProduksiWipId: number;
    doKeluarBahanProduksiWipDetailId: number;
    noUrut: number;
    noKoil: string;
    kodeBahan: string;
    namaBahan: string;
    jumlah: number;
}

interface DOMasukBarangJadiApiResponse {
    statusCode: string;
    message: string;
    data: {
        doMasukBarangHasilProduksiWipId: number;
        fakturDoMasukBarangHasilProduksiWip: string;
        tglDoMasukBarangHasilProduksiWip: string;
        noLembarManual: string;
        userNameEntry: string;
        waktuEntry: string;
        items: DOMasukItemApi[];
    };
}

interface DOMasukItemApi {
    doMasukBarangHasilProduksiWipId: number;
    doMasukBarangHasilProduksiWipDetailId: number;
    noUrut: number;
    kodeBarang: string;
    namaBarang: string;
    noKoilBahan: string;
    panjang: number;
    qty: number;
    jumlah: number;
    hasil: string;
}

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
            catatan: this.http.get<CatatanProduksiWIPApiResponse>(`${this.apiUrl}/PrintProduksi/GetProduksiWipByProduksiWipId/${id}`),
            doKeluar: this.http.get<DOKeluarBahanBakuApiResponse>(`${this.apiUrl}/PrintProduksi/GetDoKeluarBahanBakuByProduksiWipId/${id}`),
            doMasuk: this.http.get<DOMasukBarangJadiApiResponse>(`${this.apiUrl}/PrintProduksi/GetDoMasukBarangJadiByProduksiWipId/${id}`)
        }).pipe(
            map(responses => ({
                catatanProduksi: this.mapCatatanProduksiToModel(responses.catatan),
                doKeluarBahanBaku: this.mapDOKeluarToModel(responses.doKeluar),
                doMasukBarangJadi: this.mapDOMasukToModel(responses.doMasuk)
            }))
        );
    }

    private mapCatatanProduksiToModel(response: CatatanProduksiWIPApiResponse): CatatanProduksiWIP {
        const data = response.data;
        const tglProduksi = new Date(data.tglFakturProduksi);

        return {
            noProduksi: data.fakturProduksi,
            tglProduksi: tglProduksi,
            operator: data.userNameEntry,
            halaman: 1, // Default value, not in API
            tanggalHalaman: tglProduksi,
            items: data.items.map(item => this.mapCatatanProduksiItemToModel(item))
        };
    }

    private mapCatatanProduksiItemToModel(item: CatatanProduksiItemApi): CatatanProduksiItem {
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
            noDO: data.fakturDoKeluarBahanProduksiWip,
            tanggal: new Date(data.tglDoKeluarBahanProduksiWip),
            noSP: data.noLembarManual,
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
            panjang: item.jumlah,
            keterangan: '' // Not in API
        };
    }

    private mapDOMasukToModel(response: DOMasukBarangJadiApiResponse): DOMasukBarangJadi {
        const data = response.data;
        const waktuEntry = new Date(data.waktuEntry);

        return {
            noDO: data.fakturDoMasukBarangHasilProduksiWip,
            tanggal: new Date(data.tglDoMasukBarangHasilProduksiWip),
            noSP: data.noLembarManual,
            items: data.items.map(item => this.mapDOMasukItemToModel(item)),
            timestamp: format(waktuEntry, 'HH:mm:ss'),
            user: data.userNameEntry
        };
    }

    private mapDOMasukItemToModel(item: DOMasukItemApi): DOMasukItem {
        return {
            no: item.noUrut,
            kodeBarang: item.kodeBarang,
            namaBarang: item.namaBarang,
            kodeKoil: item.noKoilBahan,
            panjang: item.panjang,
            qty: item.qty,
            jumlah: item.jumlah
        };
    }
}
