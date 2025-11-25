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
    panjang: number;
    keterangan: string;
}

export interface DOMasukBarangJadi {
    noDO: string;
    tanggal: Date;
    noSP: string;
    items: DOMasukItem[];
    timestamp: string;
    user: string;
}

export interface DOMasukItem {
    no: number;
    kodeBarang: string;
    namaBarang: string;
    kodeKoil: string;
    panjang: number;
    qty: number;
    jumlah: number;
}

export interface CatatanProduksiWIP {
    noProduksi: string;
    tglProduksi: Date;
    operator: string;
    halaman: number;
    tanggalHalaman: Date;
    items: CatatanProduksiItem[];
}

export interface CatatanProduksiItem {
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

export interface ProduksiWIPReport {
    doKeluarBahanBaku: DOKeluarBahanBaku;
    doMasukBarangJadi: DOMasukBarangJadi;
    catatanProduksi: CatatanProduksiWIP;
}
