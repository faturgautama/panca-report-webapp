import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface RouteInfo {
    path: string;
    description: string;
    reportName: string;
    paperSize: string;
    example: string;
}

@Component({
    selector: 'app-routes-info',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './routes-info.component.html',
    styleUrls: ['./routes-info.component.scss']
})
export class RoutesInfoComponent {
    routes = signal<RouteInfo[]>([
        {
            path: '/report/surat-pesanan/:id',
            description: 'Surat Pesanan untuk konsumen',
            reportName: 'Surat Pesanan',
            paperSize: 'A4 (210mm x 297mm)',
            example: '/report/surat-pesanan/1'
        },
        {
            path: '/report/surat-jalan/pus1/:id',
            description: 'Surat Jalan PUS 1 dengan blangko kuning',
            reportName: 'Surat Jalan PUS 1',
            paperSize: '215mm x 140mm',
            example: '/report/surat-jalan/pus1/1'
        },
        {
            path: '/report/surat-jalan/pus2/:id',
            description: 'Surat Jalan PUS 2 dengan blangko merah muda',
            reportName: 'Surat Jalan PUS 2',
            paperSize: '215mm x 160mm',
            example: '/report/surat-jalan/pus2/1'
        },
        {
            path: '/report/invoice/:id',
            description: 'Faktur Penjualan / Invoice',
            reportName: 'Invoice',
            paperSize: 'A4 (210mm x 297mm)',
            example: '/report/invoice/1'
        },
        {
            path: '/report/produksi-pull/:id',
            description: 'DO Keluar Bahan Baku & Catatan Produksi',
            reportName: 'Produksi Pull',
            paperSize: 'A4 (210mm x 297mm)',
            example: '/report/produksi-pull/1'
        },
        {
            path: '/report/produksi-wip/:id',
            description: 'DO Keluar, DO Masuk & Catatan Produksi WIP',
            reportName: 'Produksi WIP',
            paperSize: 'A4 (210mm x 297mm)',
            example: '/report/produksi-wip/1'
        },
        {
            path: '/report/sj-alias/:id',
            description: 'Faktur Penjualan (SJ Alias)',
            reportName: 'SJ Alias',
            paperSize: 'A4 (210mm x 297mm)',
            example: '/report/sj-alias/1'
        }
    ]);

    copyToClipboard(text: string): void {
        navigator.clipboard.writeText(text).then(() => {
            alert('URL copied to clipboard!');
        });
    }
}
