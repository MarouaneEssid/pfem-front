import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SubjectService } from '../../services/subject.service'
import { Router } from '@angular/router';
import { Technology } from '../../models/technology';
import { Subject } from '../../models/subject';
import { TechnologyService } from '../../services/technology.service';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  templateUrl: 'subjectform.component.html',
  styleUrls: ['./subjectform.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectFormComponent {
  tags: Technology[];
  addTagPromise: Function; // add tag to technologies field
  subjectForm: FormGroup;
  jwtInfo;
  userID;
  userDTO = { id: null, role: { id: 2, name: 'COLLAB' } }
  publicationDate = Date.now();
  subject: Subject;
  validationError = '';

  constructor(
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private technologyService: TechnologyService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.subjectForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.minLength(4)]],
      description: [null, [Validators.required, Validators.minLength(4)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      technologies: [null],
    });

    this.jwtInfo = Object.assign({}, this.decodeCurrentUser());
    this.userID = this.jwtInfo.id;
    this.userDTO.id = this.userID;

    this.getTechnologies();
    this.addTagPromise =
      techno => this.technologyService.addTechnology(new Technology(null, techno)).toPromise();
  }

  getTechnologies() {
    this.technologyService.getTechnologies().subscribe(
      data => this.tags = data,
      error => console.log('fetch technologies, ' + error)
    );
  }

  decodeCurrentUser() {
    return jwt_decode(this.authenticationService.currentUserValue.jwt);
  }

  onSubmit(event: Event) {
    if (this.startDate.value > this.endDate.value) {
      this.validationError = 'date de fin inférieure à la date de début';
      event.preventDefault();
    }

    this.subjectForm.value.userDTO = this.userDTO;
    this.subjectForm.value.publicationDate = new Date(this.publicationDate);
    this.subjectService.addSubject(this.subjectForm.value).subscribe(
      res => {
        this.toastr.success('sujet ajouté', 'succès');
        this.router.navigate(['dashboard']);
      },
      err => console.log(err));
  }

  // getters
  get title(): AbstractControl {
    return this.subjectForm.get('title');
  }
  get description(): AbstractControl {
    return this.subjectForm.get('description');
  }
  get startDate(): AbstractControl {
    return this.subjectForm.get('startDate');
  }
  get endDate(): AbstractControl {
    return this.subjectForm.get('endDate');
  }
  get technologies(): AbstractControl {
    return this.subjectForm.get('technologies');
  }
}
