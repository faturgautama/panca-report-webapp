import { Invoice } from '../models/invoice.model';
import { ProduksiPullReport } from '../models/produksi-pull.model';
import { ProduksiWIPReport } from '../models/produksi-wip.model';
import { SJAlias } from '../models/sj-alias.model';
import { SuratJalan } from '../models/surat-jalan.model';
import { SuratPesanan } from '../models/surat-pesanan.model';

export class MockDatasource {
    mockDataSuratPesanan: SuratPesanan = {
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

    mockDataSuratJalan: SuratJalan = {
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

    mockDataSjAlias: SJAlias = {
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
        bankTransfer: {
            nama: 'PT. Panca Usaha Sakti',
            jenis: 'BCA',
            noRekening: '182 879 7777'
        }
    };

    mockDataProduksiWip: ProduksiWIPReport = {
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

    mockDataProduksiPull: ProduksiPullReport = {
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

    mockDataInvoice: Invoice = {
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
}
