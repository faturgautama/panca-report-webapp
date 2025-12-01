import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuratJalan, SuratJalanItem } from '../models/surat-jalan.model';
import { SuratJalanMockService } from './surat-jalan-mock.service';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';

// API Response interfaces
interface SuratJalanApiResponse {
    statusCode: string;
    message: string;
    data: {
        suratJalanId: number;
        fakturSuratJalanProgramLama: string;
        fakturSuratJalan: string;
        tglSuratJalan: string;
        noSeriLembarManualSp: string;
        tglFakturSp: string;
        kodeCustomer: string;
        namaCustomer: string;
        alamatCustomer: string;
        kotaCustomer: string;
        kodeSales: string;
        namaSales: string;
        notesKirim: string;
        contactPerson: string;
        alamatKirim: string;
        kotaAlamatKirim: string;
        jenisKendaraan: string;
        platNoTruk: string;
        namaDriver: string;
        hpDriver: string;
        ketReturPengganti: string;
        userNameEntry: string;
        waktuEntry: string;
        items: SuratJalanItemApi[];
    };
}

interface SuratJalanItemApi {
    suratJalanId: number;
    suratJalanDetailId: number;
    kodeBarangMurni: string;
    kodeBarang: string;
    namaBarangMurni: string;
    namaBarang: string;
    kodeKlasifikasi: string;
    panjang: number;
    qty: number;
    jumlah: number;
    satuan: string;
}

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

        return this.http.get<SuratJalanApiResponse>(
            `${this.apiUrl}/PrintSuratJalan/GetSuratJalanBySuratJalanId/${id}`
        ).pipe(
            map(response => this.mapApiResponseToModel(response, type))
        );
    }

    private mapApiResponseToModel(response: SuratJalanApiResponse, type: 'PUS1' | 'PUS2'): SuratJalan {
        const data = response.data;
        const tglSuratJalan = new Date(data.tglSuratJalan);
        const waktuEntry = new Date(data.waktuEntry);

        return {
            id: data.suratJalanId.toString(),
            tanggal: tglSuratJalan,
            nomorSurat: `${data.noSeriLembarManualSp} - ${format(tglSuratJalan, 'dd-MM-yyyy')}`,
            user: data.userNameEntry,
            timestamp: format(waktuEntry, 'HH:mm:ss'),
            customer: {
                nama: data.namaCustomer,
                alamat: data.alamatCustomer.trim(),
                kota: data.kotaCustomer,
                kode: `${data.kotaCustomer} ${data.kodeCustomer}`
            },
            items: data.items.map((item, index) => this.mapItemApiToModel(item, index)),
            sales: data.namaSales,
            tujuan: `${data.alamatKirim} - ${data.kotaAlamatKirim}`.toLowerCase(),
            type: type
        };
    }

    private mapItemApiToModel(item: SuratJalanItemApi, index: number): SuratJalanItem {
        return {
            kodeBarang: item.kodeBarang,
            namaBarang: item.namaBarang,
            panjang: item.panjang,
            qty: item.qty,
            jumlah: item.jumlah,
            status: item.satuan,
            urutan: item.kodeKlasifikasi
        };
    }
}
