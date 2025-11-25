import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ProduksiWIPReport } from '../models/produksi-wip.model';

@Injectable({
    providedIn: 'root'
})
export class ProduksiWIPMockService {
    private mockData: ProduksiWIPReport = {
        doKeluarBahanBaku: {
            noDO: '2509-0001',
            tanggal: new Date('2025-09-01'),
            noSP: '88851',
            items: [
                { no: 1, kodeKoil: '7969-6', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 642.00, keterangan: '' },
                { no: 2, kodeKoil: '7969-5', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 642.00, keterangan: '' },
                { no: 3, kodeKoil: '7969-4', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 642.00, keterangan: '' },
                { no: 4, kodeKoil: '7969-9', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 822.00, keterangan: '' },
                { no: 5, kodeKoil: '7969-8', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 822.00, keterangan: '' },
                { no: 6, kodeKoil: '7969-7', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 822.00, keterangan: '' },
                { no: 7, kodeKoil: '7969-3', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 828.00, keterangan: '' },
                { no: 8, kodeKoil: '7969-2', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 828.00, keterangan: '' },
                { no: 9, kodeKoil: '7969-1', kodeBarang: '11.0065.0151.070.01.00', namaBarang: 'TRUSS X 0.65 151 70 [NONE] BMT', panjang: 828.00, keterangan: '' }
            ],
            timestamp: '11/25/2025 7:41:17AM',
            user: 'adit_admin'
        },
        doMasukBarangJadi: {
            noDO: '2509-0001',
            tanggal: new Date('2025-09-01'),
            noSP: '88851',
            items: [
                { no: 1, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-6', panjang: 6.00, qty: 107.00, jumlah: 642.00 },
                { no: 2, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-5', panjang: 6.00, qty: 107.00, jumlah: 642.00 },
                { no: 3, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-4', panjang: 6.00, qty: 107.00, jumlah: 642.00 },
                { no: 4, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-9', panjang: 6.00, qty: 137.00, jumlah: 822.00 },
                { no: 5, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-8', panjang: 6.00, qty: 137.00, jumlah: 822.00 },
                { no: 6, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-7', panjang: 6.00, qty: 137.00, jumlah: 822.00 },
                { no: 7, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-3', panjang: 6.00, qty: 138.00, jumlah: 828.00 },
                { no: 8, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-2', panjang: 6.00, qty: 138.00, jumlah: 828.00 },
                { no: 9, kodeBarang: '11.0075.0151.2001.00.600.07.01.00', namaBarang: 'DINOTRUSS 151 TRUSS X 0.75', kodeKoil: '7969-1', panjang: 6.00, qty: 138.00, jumlah: 828.00 }
            ],
            timestamp: '11/25/2025 7:41:17AM',
            user: 'adit_admin'
        },
        catatanProduksi: {
            noProduksi: '2509-0001',
            tglProduksi: new Date('2025-09-01'),
            operator: 'adit_admin',
            halaman: 1,
            tanggalHalaman: new Date('2025-09-01'),
            items: [
                { noCoil: '7969-6', jenis: 'TRUSS X', beratKoil: 501.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 107.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-5', jenis: 'TRUSS X', beratKoil: 501.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 107.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-4', jenis: 'TRUSS X', beratKoil: 501.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 107.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-9', jenis: 'TRUSS X', beratKoil: 643.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 137.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-8', jenis: 'TRUSS X', beratKoil: 643.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 137.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-7', jenis: 'TRUSS X', beratKoil: 643.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 137.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-3', jenis: 'TRUSS X', beratKoil: 646.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 138.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-2', jenis: 'TRUSS X', beratKoil: 646.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 138.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' },
                { noCoil: '7969-1', jenis: 'TRUSS X', beratKoil: 646.00, lebar: 151, swgTebal: 0.65, type: 'DINOTRUSS 151', lembar: 138.00, panjang: 6.00, hasil: 'JADI', parafOperator: '' }
            ]
        }
    };

    getProduksiWIPReport(id: string): Observable<ProduksiWIPReport> {
        return of({
            ...this.mockData,
            doKeluarBahanBaku: {
                ...this.mockData.doKeluarBahanBaku,
                noDO: `2509-${id.padStart(4, '0')}`
            },
            doMasukBarangJadi: {
                ...this.mockData.doMasukBarangJadi,
                noDO: `2509-${id.padStart(4, '0')}`
            },
            catatanProduksi: {
                ...this.mockData.catatanProduksi,
                noProduksi: `2509-${id.padStart(4, '0')}`
            }
        }).pipe(delay(800));
    }
}
