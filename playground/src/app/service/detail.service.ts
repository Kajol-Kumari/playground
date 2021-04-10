import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }
  baseurl = "http://localhost:3000/";

  // call the get item api
  getDetails() {
    return this.http.get(`http://localhost:3000/get-details`);
  }

  // call the delete item api
  deleteDetails(itemId) {
    var path = `${this.baseurl}delete-item/${itemId}`
    // console.log(path);
    return this.http.delete(path);
  }

  // call the post item api
  addDetail(dataObj){
    var path = `${this.baseurl}create-item`
    return this.http.post(path, dataObj);
  }

  // call the update item api
  updateDetail(dataObj){
    var itemId = dataObj._id;
    var path = `${this.baseurl}update-item/${itemId}`
    return this.http.patch(path, dataObj);
  }

  // call the pagination api
  getPageDetail(pageNum) {
    var path = `${this.baseurl}get-items/${pageNum}`;
    // console.log(path);
    return this.http.get(path);
  }

}
