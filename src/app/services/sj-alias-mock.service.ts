import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SJAlias } from '../models/sj-alias.model';

@Injectable({
    providedIn: 'root'
})
export class SJAliasMockService {
    getSJAliasData(): Observable<SJAlias> {
        const mockData: SJAlias = {
            noSP: '88732',
            konsumen: 'MARUF',
            alamat: 'PASAR BANJARMANGU BANJARNEGARA, BANJARNEGARA',
            tanggal: '2025-11-10',
            jatuhTempo: '2025-12-11',
            items: [
                {
                    qty: 50,
                    satuan: 'BATANG',
                    jenisBarang: '',
                    panjang: 6.00,
                    hargaSatuan: 69996.00,
                    totalHarga: 3499800.00
                },
                {
                    qty: 100,
                    satuan: 'BATANG',
                    jenisBarang: 'RENG BLUE',
                    panjang: 6.00,
                    hargaSatuan: 24000.00,
                    totalHarga: 2400000.00
                }
            ],
            grandTotal: 5899800.00,
            dpp: 5315135.14,
            ppn: 584664.86,
            catatan: '* Barang di nota ini dianggap sebagai titipan, dapat ditarik kembali atau diganti barang yang senilai jika pelunasan pembayaran tidak sesuai jatuh tempo',
            terbilang: 'LIMA JUTA DELAPAN RATUS SEMBILAN PULUH SEMBILAN RIBU DELAPAN RATUS RUPIAH',
            footerPayment: '* Titipan angsuran tunai wajib ditulis diatas nota, tidak dibalik nota\n* Pembayaran transfer ke rekening A/N. PT. Panca Usaha Sakti BCA : 182 879 7777\n* Pembayaran diluar rekening diatas atau angsuran tunai tidak ditulis diatas nota, pembayaran tidak sah/gagal',
            bankTransfer: {
                nama: 'PT. Panca Usaha Sakti',
                jenis: 'BCA',
                noRekening: '182 879 7777'
            }
        };

        return of(mockData);
    }
}
