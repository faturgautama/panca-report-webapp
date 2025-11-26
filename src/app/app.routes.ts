import { Routes } from '@angular/router';
import { Home } from './views/home/home';
import { RoutesInfoComponent } from './views/routes-info/routes-info.component';
import { SuratPesananPrintComponent } from './views/surat-pesanan/surat-pesanan-print.component';
import { SuratJalanPus1PrintComponent } from './views/surat-jalan-pus1/surat-jalan-pus1-print.component';
import { SuratJalanPus2PrintComponent } from './views/surat-jalan-pus2/surat-jalan-pus2-print.component';
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
        path: 'routes-info',
        component: RoutesInfoComponent
    },
    {
        path: 'report/surat-pesanan/:id',
        component: SuratPesananPrintComponent
    },
    {
        path: 'report/surat-jalan/pus1/:id',
        component: SuratJalanPus1PrintComponent
    },
    {
        path: 'report/surat-jalan/pus2/:id',
        component: SuratJalanPus2PrintComponent
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
