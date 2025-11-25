import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.model';
import { InvoiceMockService } from './invoice-mock.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    private http = inject(HttpClient);
    private mockService = inject(InvoiceMockService);
    private apiUrl = environment.apiUrl;
    private useMock = environment.useMock;

    getInvoiceById(id: string): Observable<Invoice> {
        if (this.useMock) {
            return this.mockService.getInvoiceById(id);
        }
        return this.http.get<Invoice>(`${this.apiUrl}/invoice/${id}`);
    }
}
