export interface Invoice {
    id: string;
    nomorFaktur: string;

    penjual: {
        nama: string;
        alamat: string;
        npwp: string;
    };

    pembeli: {
        nama: string;
        alamat: string;
        npwp: string;
    };

    nomorInvoice: string;
    tanggalFaktur: Date;
    nomorOrder: string;
    suratJalan: string;
    syaratPembayaran: string;
    jatuhTempo: Date;
    mataUang: string;

    items: InvoiceItem[];

    hargaJual: number;
    diskonUangMuka: number;
    koreksi: number;
    dikurangiUangMuka: number;
    pajakPenjualan: number;
    totalHargaJual: number;

    bankTransfer: {
        nama: string;
        jenis: string;
        noRekening: string;
    };

    lokasi: string;
    tanggalPembayaran: Date;

    companyFooter: {
        nama: string;
        phone: string;
        fax: string;
    };
}

export interface InvoiceItem {
    no: number;
    namaBarang: string;
    panjang: number;
    qty: number;
    jumlah: number;
    hargaSatuan: number;
    subTotal: number;
}
