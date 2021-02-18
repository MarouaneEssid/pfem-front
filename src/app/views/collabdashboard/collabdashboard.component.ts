import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from '../../models/application'
import { ApplicationService } from '../../services/application.service';
import { AuthenticationService } from '../../services/authentication.service';
import jwt_decode from 'jwt-decode'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  templateUrl: 'collabdashboard.component.html'
})
export class CollabDashboardComponent implements OnInit {
  currentUserId: number;
  applications: Application[] = [];
  isLoadingResults = true;
  modalRef: BsModalRef;
  currentCoverLetter: string;
  fileUrl: string;
  infoForm: FormGroup;
  currentItem2;
  technologies;
  selected;


  constructor(private authenticationService: AuthenticationService,
    private applicationService: ApplicationService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,) { }

  decodeCurrentUser() {
    return jwt_decode(this.authenticationService.currentUserValue.jwt);
  }

  getApplicationsByCollabId(): void {
    let jwtinfo;
    jwtinfo = Object.assign({}, this.decodeCurrentUser());
    this.currentUserId = jwtinfo.id;
    this.applicationService.getApplicationsByCollabId(jwtinfo.id)
      .subscribe(application => {
        this.applications = application;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  ngOnInit() {
    this.getApplicationsByCollabId();
    this.infoForm = this.formBuilder.group({
      title2: [null, Validators.required],
      description: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      technologies: [null, Validators.required]

    });
  }

  clicktoSeeCoverLetter(template: TemplateRef<any>, coverLetter: string) {
    this.currentCoverLetter = coverLetter
    this.modalRef = this.modalService.show(template);
  }
  clicktoDownload(id: number, name: string) {

    this.fileUrl = this.applicationService.downloadResume(id, name.slice(8))

  }
  cancel() {
    this.modalRef.hide();
  }
  showDetails(template2: TemplateRef<any>, subject: {}) {
    this.currentItem2 = subject
    this.technologies = this.currentItem2.technologies
    this.selected = this.currentItem2.technologies;
    this.infoForm.controls['technologies'].disable();
    this.modalRef = this.modalService.show(template2);
  }

}
