import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    URL_API = environment.apiUrl;
    ID_ORG  = environment.idOrganizacion;
    ID_APPLICATION = environment.aplication;
    
    constructor(private auth:AuthService, private http: HttpClient) { }
    
    
    public ApiCall(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders({ "Content-Type": "application/json", "Accept-Language":"es_EC",  "Authorization": "Bearer " + this.auth.getToken(), "Application":this.ID_APPLICATION,"IdOrganizacion":this.ID_ORG});
        const headers2 = new HttpHeaders({'Content-Type':'multipart/form-data',  "Authorization": "Bearer " + this.auth.getToken(), "application":this.ID_APPLICATION });

        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers , params : data2 });
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            case "PUTMULT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }
    }
    
    public ApiCallDwh(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders({ "Content-Type": "application/json", "Accept-Language":"es_EC",  "Authorization": "Bearer " + this.auth.getToken(), "Application":this.ID_APPLICATION,"IdOrganizacion":this.ID_ORG});
        const headers2 = new HttpHeaders({'Content-Type':'multipart/form-data',  "Authorization": "Bearer " + this.auth.getToken(), "application":this.ID_APPLICATION });

        switch (method) {
            case "GET":
                return this.http.get( endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post( endpoint, data, { headers: headers , params : data2 });
            
            case "PUT":
                return this.http.put( endpoint, data, { headers: headers , params : data2  });
            case "PUTMULT":
                return this.http.put( endpoint, data, { headers: headers , params : data2  });
            case "DELETE":
            return this.http.delete( endpoint, { headers: headers, params: data });
        }
    }


    public ApiCallDownload(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders({ "Content-Type": "application/json","Accept-Language":"es_EC", "Authorization": "Bearer " + this.auth.getToken(), "Application":this.ID_APPLICATION, "IdOrganizacion":this.ID_ORG });
        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data , responseType:'Blob' as 'json' })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers, responseType:'Blob' as 'json' });
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }
    }

    public ApiCallMultiPart(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders({"Accept": "application/json", "Authorization": "Bearer " + this.auth.getToken(), "application":this.ID_APPLICATION,"IdOrganizacion":this.ID_ORG });
        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(this.URL_API + endpoint, data, { headers: headers });
            
            case "PUT":
                return this.http.put(this.URL_API + endpoint, data, { headers: headers , params : data2  });
            
            case "DELETE":
            return this.http.delete(this.URL_API + endpoint, { headers: headers, params: data });
        }
    }
    
    public apiPublicCall(endpoint:string, method:string, data:any) {
        const headers = new HttpHeaders({"Authorization": "Bearer " + this.auth.getToken(),  "Application":this.ID_APPLICATION,"IdOrganizacion":this.ID_ORG  });
        switch (method) {
            case "GET":
                return this.http.get(this.URL_API + endpoint, { headers: headers , params: data })
                        .pipe( map( (response:any)=>{
                            if(  response.code != 200 ){
                                throw new Error(response.code.toString());
                            }else{
                                return response.data;
                            }
                        }))
            case "POST":
            return this.http.post(this.URL_API + endpoint, data, { headers: headers })
        }
    }

    public ApiCallValor(endpoint, method, data, data2=null) {
        const headers = new HttpHeaders({ "Content-Type": "application/json", "Accept-Language":"es_EC",  "Authorization": "Bearer " + this.auth.getToken(), "Application":this.ID_APPLICATION,"IdOrganizacion":this.ID_ORG});
        const headers2 = new HttpHeaders({'Content-Type':'multipart/form-data',  "Authorization": "Bearer " + this.auth.getToken(), "application":this.ID_APPLICATION });

        switch (method) {
            case "GET":
                return this.http.get(endpoint, { headers: headers , params: data })
            case "POST":
                return this.http.post(endpoint, data, { headers: headers , params : data2 });
            
            case "PUT":
                return this.http.put(endpoint, data, { headers: headers , params : data2  });
            case "PUTMULT":
                return this.http.put(endpoint, data, { headers: headers , params : data2  });
            case "DELETE":
            return this.http.delete(endpoint, { headers: headers, params: data });
        }
    }
    
}
