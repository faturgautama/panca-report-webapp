import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SuratJalan } from '../models/surat-jalan.model';

@Injectable({
    providedIn: 'root'
})
export class SuratJalanMockService {
    private mockData: SuratJalan = {
        id: '1',
        tanggal: new Date('2025-11-10'),
        nomorSurat: '88732 - 10-11-2025',
        user: 'elis',
        timestamp: '14:43:46',
        customer: {
            nama: "MA'RUF",
            alamat: 'PASAR BANJARMANGU',
            kota: 'BANJARNEGARA',
            kode: 'BANJARNEGARA 0330400001'
        },
        items: [
            {
                kodeBarang: '11.0075.0151.2001.00.600.07',
                namaBarang: 'DINOTRUSS 151 TRUSS X 0.75',
                panjang: 50.00,
                qty: 6.00,
                jumlah: 300.00,
                status: 'BATANG',
                urutan: '00'
            },
            {
                kodeBarang: '13.0035.0093.2004.03.0600',
                namaBarang: 'RENG 93 IMPORT 0.35',
                panjang: 100.00,
                qty: 6.00,
                jumlah: 600.00,
                status: 'BATANG',
                urutan: '01'
            }
        ],
        sales: 'ARI BANJAR',
        tujuan: 'paseh banjarmangu banjarnegara - banjarnegara',
        type: 'PUS1'
    };

    getSuratJalanById(id: string, type: 'PUS1' | 'PUS2'): Observable<SuratJalan> {
        const data = { ...this.mockData };

        // Adjust data for PUS2
        if (type === 'PUS2') {
            data.items = data.items.map(item => ({
                ...item,
                qty: item.qty,
                qtyBatang: item.qty
            }));
        }

        return of({
            ...data,
            id,
            type,
            nomorSurat: `${88732 + parseInt(id)} - 10-11-2025`
        }).pipe(delay(800));
    }
}
