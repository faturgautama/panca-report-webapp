import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ProduksiPullReport } from '../models/produksi-pull.model';

@Injectable({
    providedIn: 'root'
})
export class ProduksiPullMockService {
    private mockData: ProduksiPullReport = {
        doKeluarBahanBaku: {
            noDO: '2509-0011',
            tanggal: new Date('2025-09-08'),
            noSP: '88315',
            items: [
                {
                    no: 1,
                    kodeKoil: '225101',
                    kodeBarang: '18.0020.0914.050.01.01',
                    namaBarang: 'CHINA ECO 0.2 914 50 [NONE] TCT',
                    jumlah: 75.00
                },
                {
                    no: 2,
                    kodeKoil: '7914-5',
                    kodeBarang: '11.0065.0136.070.01.00',
                    namaBarang: 'TRUSS X 0.65 135 70 [NONE] BMT',
                    jumlah: 300.00
                }
            ],
            timestamp: '11/25/2025 7:40:49AM',
            user: 'adit_admin'
        },
        catatanProduksi: {
            noProduksi: '88315',
            tglProduksi: new Date('2025-09-08'),
            operator: 'adit_admin',
            halaman: 1,
            tanggalHalaman: new Date('2025-09-08'),
            items: [
                {
                    noCoil: '225101',
                    jenis: 'CHINA ECO',
                    beratKoil: 81.75,
                    lebar: 914,
                    swgTebal: 0.20,
                    type: 'ALSPAN 75ST',
                    lembar: 25.00,
                    panjang: 3.00,
                    hasil: 'JADI',
                    parafOperator: ''
                },
                {
                    noCoil: '7914-5',
                    jenis: 'TRUSS X',
                    beratKoil: 213.00,
                    lebar: 135,
                    swgTebal: 0.70,
                    type: 'DINOTRUSS 135',
                    lembar: 50.00,
                    panjang: 6.00,
                    hasil: 'JADI',
                    parafOperator: ''
                }
            ]
        }
    };

    getProduksiPullReport(id: string): Observable<ProduksiPullReport> {
        return of({
            ...this.mockData,
            doKeluarBahanBaku: {
                ...this.mockData.doKeluarBahanBaku,
                noDO: `2509-${id.padStart(4, '0')}`
            }
        }).pipe(delay(800));
    }
}
