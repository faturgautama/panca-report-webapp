import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice, InvoiceItem } from '../models/invoice.model';
import { InvoiceMockService } from './invoice-mock.service';
import { environment } from '../../environments/environment';

// API Response interfaces
interface InvoiceApiResponse {
    statusCode: string;
    message: string;
    data: {
        penjualanInvoiceId: number;
        fakturPenjualanInvoice: string;
        tglPenjualanInvoice: string;
        fakturSuratJalan: string;
        tglJatuhTempoBayar: string;
        keterangan: string;
        noSeriLembarManualSp: string;
        tglLembarManualSp: string;
        fakturSp: string;
        kodeCustomer: string;
        namaCustomer: string;
        alamatLengkapCustomer: string;
        npwp: string;
        subTotal1: number;
        potonganNilai: number;
        subTotal2: number;
        pPnNilai: number;
        grandTotal: number;
        jumlahDp: number;
        jumlahPiutang: number;
        waktuEntry: string;
        noFakturPajak: string;
        items: InvoiceItemApi[];
        bankTransfer: {
            bankRekeningCompany: string;
            namaPemilikRekeningCompany: string;
            nomorRekeningCompany: string;
        };
        footerCompany: {
            namaPerusahaan: string;
            alamat: string;
            kota: string;
            alamatLengkap: string;
            npwp: string;
            phone: string;
            fax: string;
        };
    };
}

interface InvoiceItemApi {
    penjualanInvoiceId: number;
    penjualanInvoiceDetailId: number;
    noUrut: number;
    kodeBarang: string;
    namaBarang: string;
    panjang: number;
    qty: number;
    jumlah: number;
    hargaSatuan: number;
    subTotal: number;
}

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private http = inject(HttpClient);
    private mockService = inject(InvoiceMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getInvoiceById(id: string): Observable<Invoice> {
        if (this.useMock) {
            return this.mockService.getInvoiceById(id);
        }

        return this.http.get<InvoiceApiResponse>(
            `${this.apiUrl}/PrintInvoice/GetInvoiceByPenjualanInvoiceId/${id}`
        ).pipe(
            map(response => this.mapApiResponseToModel(response))
        );
    }

    private mapApiResponseToModel(response: InvoiceApiResponse): Invoice {
        const data = response.data;
        const footer = data.footerCompany;

        return {
            id: data.penjualanInvoiceId.toString(),
            nomorFaktur: data.noFakturPajak || '',
            penjual: {
                nama: footer.namaPerusahaan,
                alamat: `${footer.alamat}, ${footer.kota}`.trim(),
                npwp: footer.npwp || ''
            },
            pembeli: {
                nama: data.namaCustomer,
                alamat: data.alamatLengkapCustomer.replace(/\r\n/g, ' ').trim(),
                npwp: data.npwp
            },
            nomorInvoice: data.fakturPenjualanInvoice,
            tanggalFaktur: new Date(data.tglPenjualanInvoice),
            nomorOrder: data.fakturSp,
            suratJalan: data.fakturSuratJalan,
            syaratPembayaran: '', // Not in API
            jatuhTempo: new Date(data.tglJatuhTempoBayar),
            mataUang: 'IDR',
            items: data.items.map(item => this.mapItemApiToModel(item)),
            hargaJual: data.subTotal1,
            diskonUangMuka: data.potonganNilai,
            koreksi: 0, // Not in API
            dikurangiUangMuka: data.jumlahDp,
            pajakPenjualan: data.pPnNilai,
            totalHargaJual: data.grandTotal,
            bankTransfer: {
                nama: data.bankTransfer.namaPemilikRekeningCompany,
                jenis: data.bankTransfer.bankRekeningCompany,
                noRekening: data.bankTransfer.nomorRekeningCompany
            },
            lokasi: footer.kota,
            tanggalPembayaran: new Date(data.tglPenjualanInvoice),
            companyFooter: {
                nama: footer.namaPerusahaan,
                phone: footer.phone || '',
                fax: footer.fax || ''
            }
        };
    }

    private mapItemApiToModel(item: InvoiceItemApi): InvoiceItem {
        return {
            no: item.noUrut,
            namaBarang: item.namaBarang,
            panjang: item.panjang,
            qty: item.qty,
            jumlah: item.jumlah,
            hargaSatuan: item.hargaSatuan,
            subTotal: item.subTotal
        };
    }
}
