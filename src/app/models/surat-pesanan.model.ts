export interface SuratPesanan {
    id: string;
    nomorSP: string;
    tanggal: Date;
    konsumen: string;
    nomorKonsumen?: string;
    noDoc?: string;
    terbit?: string;
    rev?: string;
    items: SuratPesananItem[];
    keterangan?: string;
    createdBy?: string;
    createdAt?: Date;
}

export interface SuratPesananItem {
    no: number;
    kodeBarang: string;
    namaBarang: string;
    pjg: number;
    qty: number;
    jumlah: number;
    notesPrinting?: string;
}
