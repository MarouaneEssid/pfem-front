import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Subject } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import jwt_decode from 'jwt-decode'
import { AuthenticationService } from '../../services/authentication.service';
import { TechnologyService } from '../../services/technology.service';
import { Technology } from '../../models/technology';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from '../../services/application.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})

export class SubjectComponent implements OnInit {
  subjects: Subject[];
  @Input() keywords: Technology[];
  subjects$: Observable<Subject[]>;
  addTagPromise: Function;
  currentUser: User;
  updateForm: FormGroup;
  modalRef: BsModalRef;
  currentSubject: Subject;
  tags: Technology[];

  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private subjectService: SubjectService,
    private router: Router,
    private modalService: BsModalService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private technologyService: TechnologyService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {
    let payload = Object.assign({ id: null }, jwt_decode(this.authenticationService.currentUserValue.jwt));
    this.userService.getUser(payload.id).subscribe(user => this.currentUser = user);
    this.subjects$ = this.subjectService.getSubjects();
    this.subjects$.subscribe(subjects => this.subjects = subjects, error => console.log(error));
    this.buildForm();
    this.technologyService.getTechnologies().subscribe(technologies => this.tags = technologies);
    this.addTagPromise = techno => this.technologyService.addTechnology(new Technology(null, techno)).toPromise();
  }

  buildForm() {
    this.updateForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      technologies: [null, Validators.required]
    });
  }

  openSubject(template: TemplateRef<any>, subject: Subject) {
    this.currentSubject = subject;
    this.updateForm.patchValue(subject);
    this.startDate.setValue(subject.startDate.toString().substr(0, 10));
    this.endDate.setValue(subject.startDate.toString().substr(0, 10));
    this.modalRef = this.modalService.show(template);
  }

  deleteSubject(subject: Subject) {
    let index = this.subjects.indexOf(subject);
    this.subjectService.deleteSubject(subject.id).subscribe(
      sucess => this.subjects.splice(index, 1),
      error => console.log(`on subject ${subject.id} delete, ${error}`));
  }

  filterSubjects() {
    if (this.keywords.length == 0) {
      return this.subjects.sort((subject1: Subject, subject2: Subject) => subject2.id - subject1.id);
    }
    let keys = this.keywords.map(technology => technology.name);
    return this.subjects.filter(
      subject => {
        let techNames = subject.technologies.map(technology => technology.name);
        for (let techName of techNames) {
          if (keys.indexOf(techName) > -1) {
            return true;
          }
        }
      });
  }

  updateSubject() {
    let index = this.subjects.indexOf(this.currentSubject);
    this.currentSubject = { ...this.currentSubject, ...this.updateForm.value };
    this.subjectService.updateSubject(this.currentSubject.id, this.currentSubject).subscribe(
      success => {
        this.modalRef.hide()
        this.subjects.splice(index, 1, this.currentSubject);
        this.toaster.success("les modifications ont été enregistrées", "succès");
      },
      error => console.log(error));
  }

  apply(subject) {
    this.applicationService.getApplicationsByUserId(this.currentUser.id).subscribe(
      applications => {
        for (let application of applications) {
          if (application.subjectDTO.id == subject.id) {
            this.toaster.error('vous avez déja appliqué à ce sujet', 'erreur');
            return;
          }
        }
        this.router.navigate(['applicationForm', subject.id, subject.title]);
      });
  }
  cancel(){
    this.modalRef.hide();
  }

  mySubjects() {
    var i = this.subjects.length;
    while (i--) {
      if (this.currentUser.id !== this.subjects[i].userDTO.id) {
        this.subjects.splice(i, 1);
      }
    }
  }

  allSubjects() {
    this.subjectService.getSubjects().subscribe(
      data => this.subjects = data,
      error => console.log('fetch subjects', error));
  }

  // getters
  get title(): AbstractControl {
    return this.updateForm.get('title');
  }
  get description(): AbstractControl {
    return this.updateForm.get('description');
  }
  get startDate(): AbstractControl {
    return this.updateForm.get('startDate');
  }
  get endDate(): AbstractControl {
    return this.updateForm.get('endDate');
  }
  get technologies(): AbstractControl {
    return this.updateForm.get('technologies');
  }
}
