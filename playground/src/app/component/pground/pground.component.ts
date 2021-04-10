import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { interval, Subscription } from 'rxjs';

import { DetailService } from 'src/app/service/detail.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-pground',
  templateUrl: './pground.component.html',
  styleUrls: ['./pground.component.scss']
})
export class PgroundComponent implements OnInit {
  @ViewChild('dt', {static: false})
  dt: Table;
  filter(){
   this.dt.reset();
  }
  subscription: Subscription;
  // rxjs constants
  source = timer(1000);

  constructor(public translate: TranslateService, private detailService: DetailService, private messageService: MessageService) {
    translate.addLangs(['en', 'fr']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
   }

  //  for image gallery
   images = [
     {
      "previewImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "thumbnailImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "alt": "Description for Image 1",
      "title": "Title 1"
     },
     {

      "previewImageSrc": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "thumbnailImageSrc": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "alt": "Description for Image 2",
      "title": "Title 2"
    },
    {
      "previewImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "thumbnailImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "alt": "Description for Image 3",
      "title": "Title 3"
    },
    {

      "previewImageSrc": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "thumbnailImageSrc": "https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "alt": "Description for Image 4",
      "title": "Title 4"
    },
    {

      "previewImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "thumbnailImageSrc": "https://images.pexels.com/photos/1482476/pexels-photo-1482476.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "alt": "Description for Image 5",
      "title": "Title 5",
    }
   ];

   responsiveOptions:any[] = [
       {
           breakpoint: '1024px',
           numVisible: 5
       },
       {
           breakpoint: '768px',
           numVisible: 3
       },
       {
           breakpoint: '560px',
           numVisible: 1
       }
   ];

  // pagination
  first;

  data = [];
  displayData = [];

  backTxt = "Go Back Home";
  btnTxt = "Welcome To The Playground";

  // Edit data modal
  editModalDisplay = false;
  editModalTitle = "";
  editActive;
  editId;
  editName;
  editDescription;

  // Add new item modal
  modalDisplay = false;
  modalTitle = "";
  activeYes;
  activeNo;

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.data = [];
    this.detailService.getDetails().subscribe(data => {
      Object.keys(data).map(v =>{
        this.data.push(data[v]);
      })
    });
    this.displayData = this.data;
  }

  ngAfterViewInit(){
    this.showSuccess();
  }

  loadDataLazily(event: LazyLoadEvent) {
    // console.log(event);

    let pgNum = 0;
    this.first = event.first;
    if(this.first == 0){
      pgNum = 1;
    } else {
      pgNum = (this.first)/10 + 1;
    }
    // console.log(pgNum);
    this.displayData = [];
    this.detailService.getPageDetail(pgNum).subscribe((data) => {
      Object.keys(data).map(v =>{
        this.displayData.push(data[v]);
      })
    })
    console.log(this.displayData);

    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort in single sort mode
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec in single sort mode
    //multiSortMeta: An array of SortMeta objects used in multiple columns sorting. Each SortMeta has field and order properties.
    //filters: Filters object having field as key and filter value, filter matchMode as value
    //globalFilter: Value of the global filter if available
    // this.data = //do a request to a remote datasource using a service and return the cars that match the lazy load criteria
  }

  // Toast message
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Welcome To the Playground 😄'});
  }

  // function to delete the item
  DeleteItem(itemId) {
    this.detailService.deleteDetails(itemId).subscribe(res => {
      // console.log(res);
      this.getDetails();
      this.messageService.add({severity:'info', summary: 'Info', detail: 'Data Deleted Successfully! 😄'});
    })
  }

  // open edit modal
  openEditModal(data) {
    this.editId = data._id;
    this.editModalDisplay = true;
    this.editModalTitle = "Edit User Detail";
    this.editName = data.name;
    this.editDescription = data.description;
    if(data.active){
      this.editActive = "yes";
    } else {
      this.editActive = "no";
    }
  }

  // function to edit the item detail
  EditItemDetail() {
    var isActive = false;
    if(this.editActive == "yes"){
      isActive = true;
    }
    if(this.editName == ""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Name can not be Empty!'});
    } else if( this.editDescription == ""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Description can not be Empty!'});
    } else {
      var itemObj = {
        _id: this.editId,
        name: this.editName,
        description: this.editDescription,
        active: isActive
      }

      // console.log(this.editName, this.editDescription, isActive);

      this.detailService.updateDetail(itemObj).subscribe(data => {
        // console.log(data);

        this.getDetails();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Updated Successfully! 😄'})
      })
      this.editModalDisplay = false;
    }
  }

  openModal() {
    this.modalDisplay = true;
    this.modalTitle = "Add New User";
  }

  // function to add a new item
  AddNewItem(form: NgForm) {
    var name = form.value.name;
    var description = form.value.description;
    var isActive = false;
    if(this.activeYes == "yes"){
      isActive = true;
    }
    if(name == ""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Name can not be Empty!'});
    } else if( description == ""){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Description can not be Empty!'});
    } else {
      var itemObj = {
        name: name,
        description: description,
        active: isActive
      }
      this.detailService.addDetail(itemObj).subscribe(data => {
        // console.log(data);

        this.getDetails();
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Data Added Successfully! 😄'})
      })
      this.modalDisplay = false;
    }
  }

  // change language
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  // rxjs call
  playRxjs() {
    console.log('here!');
    let i = 1;
    const source = interval(1000);
    this.subscription = source.subscribe(val =>{
      var node = document.createElement("li");
        var textNode = document.createTextNode(`Hello To User ${i}`);
        var divSpan = document.getElementById("content");
        node.appendChild(textNode);
        divSpan.appendChild(node);
        i += 1;
        if(i > 10){
          var textNode = document.createTextNode(`That's it! See You Later :P`);
          document.getElementById("content").appendChild(textNode);
          this.subscription.unsubscribe();
        }
      })
    }

}
