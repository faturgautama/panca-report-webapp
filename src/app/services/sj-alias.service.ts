import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SJAlias, SJAliasItem } from '../models/sj-alias.model';
import { SJAliasMockService } from './sj-alias-mock.service';
import { environment } from '../../environments/environment';

// API Response interfaces
interface SJAliasApiResponse {
    statusCode: string;
    message: string;
    data: {
        noSeriLembarManualSp: string;
        namaCustomer: string;
        alamatLengkapCustomer: string;
        tanggal: string;
        tglJatuhTempo: string;
        totalTransaksi: number;
        terbilang: string;
        dpp: number;
        ppn: number;
        footer: string;
        footerPayment: string;
        items: SJAliasItemApi[];
        bankTransfer: {
            bankRekeningCompany: string;
            namaPemilikRekeningCompany: string;
            nomorRekeningCompany: string;
        };
    };
}

interface SJAliasItemApi {
    qty: number;
    satuan: string;
    jenisBarang: string;
    jumlah: number;
    panjang: number;
    hargaSatuan: number;
    subTotal: number;
}

@Injectable({
    providedIn: 'root'
})
export class SJAliasService {
    private http = inject(HttpClient);
    private mockService = inject(SJAliasMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getSJAliasById(id: string): Observable<SJAlias> {
        if (this.useMock) {
            return this.mockService.getSJAliasData();
        }

        return this.http.get<SJAliasApiResponse>(
            `${this.apiUrl}/PrintSuratJalan/GetSuratJalanWithAliasBySuratJalanId/${id}`
        ).pipe(
            map(response => this.mapApiResponseToModel(response))
        );
    }

    private mapApiResponseToModel(response: SJAliasApiResponse): SJAlias {
        const data = response.data;

        return {
            noSP: data.noSeriLembarManualSp,
            konsumen: data.namaCustomer,
            alamat: data.alamatLengkapCustomer.replace(/\r\n/g, ' ').trim(),
            tanggal: data.tanggal,
            jatuhTempo: data.tglJatuhTempo,
            items: data.items.map(item => this.mapItemApiToModel(item)),
            grandTotal: data.totalTransaksi,
            dpp: data.dpp,
            ppn: data.ppn,
            catatan: data.footer,
            terbilang: data.terbilang,
            footerPayment: data.footerPayment,
            bankTransfer: {
                nama: data.bankTransfer.namaPemilikRekeningCompany,
                jenis: data.bankTransfer.bankRekeningCompany,
                noRekening: data.bankTransfer.nomorRekeningCompany
            }
        };
    }

    private mapItemApiToModel(item: SJAliasItemApi): SJAliasItem {
        return {
            qty: item.qty,
            satuan: item.satuan,
            jenisBarang: item.jenisBarang,
            panjang: item.panjang,
            hargaSatuan: item.hargaSatuan,
            totalHarga: item.subTotal
        };
    }
}
