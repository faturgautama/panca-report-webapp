import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { SuratPesananPrintComponent } from './views/surat-pesanan/surat-pesanan-print.component';
import { SuratJalanPrintComponent } from './views/surat-jalan/surat-jalan-print.component';
import { InvoicePrintComponent } from './views/invoice/invoice-print.component';
import { ProduksiPullPrintComponent } from './views/produksi-pull/produksi-pull-print.component';
import { ProduksiWIPPrintComponent } from './views/produksi-wip/produksi-wip-print.component';
import { SJAliasPrintComponent } from './views/sj-alias/sj-alias-print.component';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'report/surat-pesanan/:id',
        component: SuratPesananPrintComponent
    },
    {
        path: 'report/surat-jalan/:type/:id',
        component: SuratJalanPrintComponent
    },
    {
        path: 'report/invoice/:id',
        component: InvoicePrintComponent
    },
    {
        path: 'report/produksi-pull/:id',
        component: ProduksiPullPrintComponent
    },
    {
        path: 'report/produksi-wip/:id',
        component: ProduksiWIPPrintComponent
    },
    {
        path: 'report/sj-alias/:id',
        component: SJAliasPrintComponent
    }
];
