import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice.model';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

@Component({
    selector: 'app-invoice-print',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './invoice-print.component.html',
    styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private invoiceService = inject(InvoiceService);

    protected data = signal<Invoice | null>(null);
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
        this.invoiceService.getInvoiceById(id).subscribe({
            next: (data) => {
                this.data.set(data);
                this.loading.set(false);
                // setTimeout(() => window.print(), 500);
            },
            error: (err) => {
                this.error.set('Gagal memuat data: ' + err.message);
                this.loading.set(false);
            }
        });
    }

    protected formatDate(date: Date): string {
        return format(new Date(date), 'EEEE, dd MMMM yyyy', { locale: localeId });
    }

    protected formatCurrency(amount: number): string {
        return amount.toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    protected formatNumber(num: number): string {
        return num.toFixed(2);
    }

    protected print(): void {
        window.print();
    }
}
