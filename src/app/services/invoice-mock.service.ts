import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Invoice } from '../models/invoice.model';

@Injectable({
    providedIn: 'root'
})
export class InvoiceMockService {
    private mockData: Invoice = {
        id: '1',
        nomorFaktur: 'PN.IV.01.00',

        penjual: {
            nama: 'PT Panca Usaha Sakti',
            alamat: '',
            npwp: ''
        },

        pembeli: {
            nama: 'KAMDI',
            alamat: 'TEMANGGUNG, TEMANGGUNG',
            npwp: '-'
        },

        nomorInvoice: '2101-0001',
        tanggalFaktur: new Date('2021-01-04'),
        nomorOrder: '58308',
        suratJalan: '5820-0082',
        syaratPembayaran: '',
        jatuhTempo: new Date('2021-01-01'),
        mataUang: 'IDR (Rupiah)',

        items: [
            {
                no: 1,
                namaBarang: '914 TATALUME 0.3',
                panjang: 22.00,
                qty: 1.00,
                jumlah: 22.00,
                hargaSatuan: 29000.00,
                subTotal: 638000.00
            }
        ],

        hargaJual: 638000.00,
        diskonUangMuka: 0.00,
        koreksi: 0.00,
        dikurangiUangMuka: 580000.00,
        pajakPenjualan: 58000.00,
        totalHargaJual: 638000.00,

        bankTransfer: {
            nama: 'PT PANCA USAHA SAKTI',
            jenis: 'BCA',
            noRekening: '1828797777'
        },

        lokasi: 'Semarang',
        tanggalPembayaran: new Date('2021-01-04'),

        companyFooter: {
            nama: 'PT Panca Usaha Sakti',
            phone: '',
            fax: ''
        }
    };

    getInvoiceById(id: string): Observable<Invoice> {
        return of({
            ...this.mockData,
            id,
            nomorInvoice: `2101-${id.padStart(4, '0')}`
        }).pipe(delay(800));
    }
}
