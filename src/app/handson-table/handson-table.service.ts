import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HotTableService {
    private url = 'https://cdn.rawgit.com/swistach/2503ee590c97efb156494c8be6e1b15e/raw/be88418df10ad8f9036b7f8586fb3865be5d9840/remote-data.json';

    constructor(private httpClient: HttpClient) { }

    getAllUsers() {
        return this.httpClient.get(this.url);
    }
}