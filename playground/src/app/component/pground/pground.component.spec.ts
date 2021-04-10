import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FilterService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule, RadioControlRegistry } from 'primeng/radiobutton';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DetailService } from 'src/app/service/detail.service';

import { PgroundComponent } from './pground.component';

describe('PgroundComponent', () => {
  let component: PgroundComponent;
  let fixture: ComponentFixture<PgroundComponent>;
  let detailService: DetailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgroundComponent ],
      imports: [TranslateModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, GalleriaModule, ButtonModule , ToastModule, ScrollPanelModule, InputTextModule, ScrollTopModule, TableModule, CardModule, RadioButtonModule, CarouselModule, HttpClientTestingModule, DialogModule, FormsModule],
      providers: [ DetailService, MessageService, FilterService, RadioControlRegistry ]
    })
    .compileComponents();
  }));

  beforeEach(inject([DetailService], (service: DetailService) => {
    detailService = service
    fixture = TestBed.createComponent(PgroundComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  // test get all detail function
  it('should call getDetail Service', () => {
    spyOn(detailService, 'getDetails').and.callThrough();
    component.getDetails();
    expect(detailService.getDetails).toHaveBeenCalled();
  });

  // test delete function
  it('should call delete Service', () => {
    const itemId = 1;
    spyOn(detailService, 'deleteDetails').and.callThrough();
    component.DeleteItem(itemId);
    expect(detailService.deleteDetails).toHaveBeenCalled();
  });

  // test delete function
  it('should call updateDetail Service', () => {
    spyOn(detailService, 'updateDetail').and.callThrough();
    component.EditItemDetail();
    expect(detailService.updateDetail).toHaveBeenCalled();
  });

  // test add function
  it("should call addDetail Service", () => {
    const testForm = <NgForm>{
      value: {
        name: "Testing",
        description: "Testing Description",
        active: true
      }
    };
    spyOn(detailService, 'addDetail').and.callThrough();
    component.AddNewItem(testForm);
    expect(detailService.addDetail).toHaveBeenCalled();
  });

  // test lazy loading function
  it('should call getPageDetail Service', () => {
    spyOn(detailService, 'getPageDetail').and.callThrough();
    let event: LazyLoadEvent = {
      first: 1
    };
    component.loadDataLazily(event);
    expect(detailService.getPageDetail).toHaveBeenCalled();
  });

});
