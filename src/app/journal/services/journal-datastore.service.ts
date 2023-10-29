import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Journal } from 'src/app/Models/journal';


@Injectable({
    providedIn: 'root'
})
export class JournalDatastoreService{
    

    httpOptions={
        headers: new HttpHeaders({
            'Content-type':'application/json',
            'Content-Type': 'multipart/form-data',
        })
    }
    
    
    readonly root_url = `${environment.BACK_END_HOST}Journal`

    constructor(private http : HttpClient) { }
    
    add(journal:Journal){ 
        const envJournal=new FormData();

        envJournal.append('name',journal.name);
        
        envJournal.append('journal',journal.journal);
        envJournal.append('from_page',journal.from_page);

        return this.http.post<Journal>(this.root_url,envJournal);
    }

    list(){
        return this.http.get<Journal[]>(this.root_url);
    }

    edit(journalToEdit:Journal){
        return this.http.patch<Journal>(this.root_url,journalToEdit);
    }

    findById(id:number){
        return this.http.get<Journal>(this.root_url+'/'+id);
    }

    delete(id:number){
        return this.http.delete<Journal>(this.root_url+'/'+id);
    }

    download(id:number){
        console.log('llega');
        
        return this.http.get(this.root_url+'/download/'+id,{ responseType: 'blob' });
    }
}