import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contato } from "../models/contato.model";
import { environment } from "src/environments/environment";
import { Observable, retry } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ContatoService {

    endpoint: string = environment.apiContatos + "/contatos/";

    constructor(
        private httpClient: HttpClient
    ) {

    }

    createContato(data: any): Observable<Contato> {
        return this.httpClient.post<Contato>(this.endpoint, data)
            .pipe(retry(1));
    }

    updateContato(data: any): Observable<Contato> {
        return this.httpClient.put<Contato>(this.endpoint, data)
            .pipe(retry(1));
    }

    deleteContato(id: string): Observable<Contato> {
        return this.httpClient.delete<Contato>(this.endpoint + id)
            .pipe(retry(1));
    }

    getContatos(): Observable<Contato[]> {
        return this.httpClient.get<Contato[]>(this.endpoint)
            .pipe(retry(1));
    }

    getContato(id: string): Observable<Contato> {
        return this.httpClient.get<Contato>(this.endpoint + id)
            .pipe(retry(1));
    }

}