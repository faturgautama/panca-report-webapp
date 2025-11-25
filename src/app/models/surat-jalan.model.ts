export interface SuratJalan {
    id: string;
    tanggal: Date;
    nomorSurat: string;
    user: string;
    timestamp: string;
    customer: {
        nama: string;
        alamat: string;
        kota: string;
        kode: string;
    };
    items: SuratJalanItem[];
    sales: string;
    tujuan: string;
    type: 'PUS1' | 'PUS2';
}

export interface SuratJalanItem {
    kodeBarang: string;
    namaBarang: string;
    panjang: number;
    qty?: number; // PUS2 only
    qtyBatang?: number; // PUS2 only  
    jumlah: number;
    status: string;
    urutan: string;
}
