export interface SJAliasItem {
    qty: number;
    satuan: string;
    jenisBarang: string;
    panjang: number;
    hargaSatuan: number;
    totalHarga: number;
}

export interface SJAlias {
    noSP: string;
    konsumen: string;
    alamat: string;
    tanggal: string;
    jatuhTempo: string;
    items: SJAliasItem[];
    grandTotal: number;
    dpp: number;
    ppn: number;
    catatan: string;
    terbilang: string;
    footerPayment: string;
    bankTransfer: {
        nama: string;
        jenis: string;
        noRekening: string;
    };
}
