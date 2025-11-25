export interface DOKeluarBahanBaku {
    noDO: string;
    tanggal: Date;
    noSP: string;
    items: DOItem[];
    timestamp: string;
    user: string;
}

export interface DOItem {
    no: number;
    kodeKoil: string;
    kodeBarang: string;
    namaBarang: string;
    jumlah: number;
}

export interface ProduksiPull {
    noProduksi: string;
    tglProduksi: Date;
    operator: string;
    halaman: number;
    tanggalHalaman: Date;
    items: ProduksiItem[];
}

export interface ProduksiItem {
    noCoil: string;
    jenis: string;
    beratKoil: number;
    lebar: number;
    swgTebal: number;
    type: string;
    lembar: number;
    panjang: number;
    hasil: string;
    parafOperator: string;
}

export interface ProduksiPullReport {
    doKeluarBahanBaku: DOKeluarBahanBaku;
    catatanProduksi: ProduksiPull;
}
