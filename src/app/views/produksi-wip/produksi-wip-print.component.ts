import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProduksiWIPService } from '../../services/produksi-wip.service';
import { ProduksiWIPReport } from '../../models/produksi-wip.model';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

@Component({
    selector: 'app-produksi-wip-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './produksi-wip-print.component.html',
    styleUrls: ['./produksi-wip-print.component.scss']
})
export class ProduksiWIPPrintComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private produksiWIPService = inject(ProduksiWIPService);

    protected data = signal<ProduksiWIPReport | null>(null);
    protected loading = signal(true);
    protected error = signal<string | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadData(id);
        } else {
            this.error.set('ID tidak ditemukan');
            this.loading.set(false);
        }
    }

    private loadData(id: string): void {
        this.produksiWIPService.getProduksiWIPReport(id).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                setTimeout(() => window.print(), 500);
            },
            error: (err) => {
                this.error.set('Gagal memuat data: ' + err.message);
                this.loading.set(false);
            }
        });
    }

    protected formatDate(date: Date): string {
        return format(new Date(date), 'yyyy-MM-dd', { locale: localeId });
    }

    protected formatNumber(num: number): string {
        return num.toFixed(2);
    }

    protected print(): void {
        window.print();
    }
}
