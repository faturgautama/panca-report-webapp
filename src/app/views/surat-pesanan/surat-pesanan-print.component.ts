import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuratPesananService } from '../../services/surat-pesanan.service';
import { SuratPesanan } from '../../models/surat-pesanan.model';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

@Component({
    selector: 'app-surat-pesanan-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './surat-pesanan-print.component.html',
    styleUrls: ['./surat-pesanan-print.component.scss']
})
export class SuratPesananPrintComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private suratPesananService = inject(SuratPesananService);

    protected data = signal<SuratPesanan | null>(null);
    protected loading = signal(true);
    protected error = signal<string | null>(null);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log("id =>", id);

        if (id) {
            this.loadData(id);
        } else {
            this.error.set('ID tidak ditemukan');
            this.loading.set(false);
        }
    }

    private loadData(id: string): void {
        this.suratPesananService.getSuratPesananById(id).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                // Auto print setelah data loaded
                setTimeout(() => window.print(), 500);
            },
            error: (err) => {
                this.error.set('Gagal memuat data: ' + err.message);
                this.loading.set(false);
            }
        });
    }

    protected formatDate(date: Date): string {
        return format(new Date(date), 'dd-MM-yyyy', { locale: localeId });
    }

    protected formatDateTime(date: Date): string {
        return format(new Date(date), 'yyyy-MM-dd HH:mm:ss', { locale: localeId });
    }

    protected formatNumber(num: number): string {
        return num.toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    protected print(): void {
        window.print();
    }
}
