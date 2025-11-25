import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SuratPesanan } from '../models/surat-pesanan.model';

@Injectable({
    providedIn: 'root'
})
export class SuratPesananMockService {
    private mockData: SuratPesanan = {
        id: '1',
        nomorSP: '2511-0117 - 88979',
        tanggal: new Date('2025-11-10'),
        konsumen: 'H JOHANES SUSANTO',
        nomorKonsumen: '0125.001',
        noDoc: '',
        terbit: '',
        rev: '',
        items: [
            {
                no: 1,
                kodeBarang: '04.0050.0914.1004.00.5000.150.01.00',
                namaBarang: '914 ZINCALUME 0.5',
                pjg: 50.00,
                qty: 3,
                jumlah: 150.00,
                notesPrinting: ''
            },
            {
                no: 2,
                kodeBarang: '04.0040.1219.1006.00.5000.150.01.00',
                namaBarang: '1219 ZINCALUME 0.4',
                pjg: 50.00,
                qty: 2,
                jumlah: 100.00,
                notesPrinting: ''
            },
            {
                no: 3,
                kodeBarang: '04.0050.1219.1006.00.5000.150.01.00',
                namaBarang: '1219 ZINCALUME 0.5',
                pjg: 50.00,
                qty: 1,
                jumlah: 50.00,
                notesPrinting: ''
            }
        ],
        keterangan: '',
        createdBy: 'Elis',
        createdAt: new Date('2025-11-24T13:31:23')
    };

    getSuratPesananById(id: string): Observable<SuratPesanan> {
        // Simulate API delay
        return of({
            ...this.mockData,
            id,
            nomorSP: `2511-${id.padStart(4, '0')} - 88979`
        }).pipe(delay(800));
    }
}
