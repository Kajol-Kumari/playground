import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { DetailService } from './detail.service';


describe('DetailService', () => {
  let httpTestingController: HttpTestingController;
  let detailService: DetailService;
  let baseUrl = "http://localhost:3000/";
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: DetailService = TestBed.get(DetailService);
    expect(service).toBeTruthy();
  });

  beforeEach(inject([DetailService], (service: DetailService) => {
    detailService = service
  }));

  // fetch all details test
  it("should fetch all data", fakeAsync(() => {
    const data  = [{
      name: "Test",
      description: "Testing Description",
      active: true
    }];

    httpTestingController = TestBed.get(HttpTestingController);
    let res: any;

    detailService.getDetails().subscribe(t => {
          Object.keys(t).map(v =>{
            res = t[v];
          })
    });

    const req = httpTestingController.expectOne({
      method: "GET",
      url:  `${baseUrl}get-details`
    });

    req.flush([data]);
    expect(res).toEqual(data);
  }));

  // add new item test
  it("should add new data", fakeAsync(() => {
    const data  = {
      name: "Test",
      description: "Testing Description",
      active: true
    };

    httpTestingController = TestBed.get(HttpTestingController);
    let res: any;

    detailService.addDetail(data).subscribe(t => {
          Object.keys(t).map(v =>{
            res = t[v];
          })
    });

    const req = httpTestingController.expectOne({
      method: "POST",
      url:  `${baseUrl}create-item`
    });

    req.flush([data]);
    expect(res).toEqual(data);
  }));

  // update existing item test
  it("should update existing data", fakeAsync(() => {
    const data  = {
      _id:1,
      name: "Testing",
      description: "Testing Description",
      active: true
    };

    httpTestingController = TestBed.get(HttpTestingController);
    let res: any;

    detailService.updateDetail(data).subscribe(t => {
          Object.keys(t).map(v =>{
            res = t[v];
          })
    });

    const req = httpTestingController.expectOne({
      method: "PATCH",
      url:  `${baseUrl}update-item/1`
    });

    req.flush([data]);
    expect(res).toEqual(data);
  }));

  // delete existing item test
  it("should delete existing data", fakeAsync(() => {
    const itemId = 1;

    httpTestingController = TestBed.get(HttpTestingController);
    let res: any;

    detailService.deleteDetails(itemId).subscribe(t => {
          Object.keys(t).map(v =>{
            res = t[v];
          })
    });

    const req = httpTestingController.expectOne({
      method: "DELETE",
      url:  `${baseUrl}delete-item/1`
    });

    req.flush([itemId]);
    expect(res).toEqual(itemId);
  }));

  // test the pagination api
  it("should cal the pagination api", fakeAsync(() => {
    const data  = [{
      name: "Test",
      description: "Testing Description",
      active: true
    }];

    httpTestingController = TestBed.get(HttpTestingController);
    let res: any;
    let pageNum = 6;

    detailService.getPageDetail(pageNum).subscribe(t => {
          Object.keys(t).map(v =>{
            res = t[v];
          })
    });

    const req = httpTestingController.expectOne({
      method: "GET",
      url:  `${baseUrl}get-items/${pageNum}`
    });

    req.flush([data]);
    expect(res).toEqual(data);
  }));


});

