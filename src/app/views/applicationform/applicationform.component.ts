import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApplicationService } from "../../services/application.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import jwt_decode from "jwt-decode";
import { AuthenticationService } from "../../services/authentication.service";
import { Application } from "../../models/application";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";

@Component({
  selector: "app-application",
  templateUrl: "applicationform.component.html",
  styleUrls: ['./applicationform.component.css'],
})
export class ApplicationFormComponent implements OnInit {
  selectedFiles: FileList;
  currentFile: File;
  message = "";
  title = "";
  sub;
  currentUserId = 1;
  currentUser: User;
  jwtinfo;
  id = 0;
  fileInfos: Observable<any>;
  applicationForm: FormGroup;
  submitted = false;
  subjectDTO = {
    id: this.id,
    technologies: [],
    userDTO: { id: this.currentUserId, role: {} },
  };
  applications: Application[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.getUserId();
    this.getSubjectId();
    this.getSubjectTitle();

  }
  decodeCurrentUser() {
    return jwt_decode(this.authenticationService.currentUserValue.jwt);
  }

  getUser(): void {
    this.userService.getUser(this.currentUserId)
      .subscribe(user => {
        this.currentUser = user;
      }, err => {
        console.log(err);
      });
  }

  getUserId(): void {
    let jwtinfo;
    jwtinfo = Object.assign({}, this.decodeCurrentUser());
    this.currentUserId = jwtinfo.id;
  }

  getSubjectId() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });
  }

  getSubjectTitle() {
    this.sub = this.route.params.subscribe((params) => {
      this.title = params["title"];
    });
  }

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      resume: ["", Validators.required],
      coverLetter: [""],
    });
    this.getUser();
  }


  save(): void {
    this.applicationForm.value.coverLetter = this.registerFormControl.coverLetter.value;
    this.subjectDTO.userDTO.id = this.currentUserId;
    this.subjectDTO.id = this.id;
    this.applicationForm.value.userDTO = this.subjectDTO.userDTO;
    this.applicationForm.value.subjectDTO = this.subjectDTO;
    this.submitted = true;
    this.upload();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.currentFile = this.selectedFiles.item(0);
    this.applicationService.upload(this.currentFile).subscribe(
      () => { },
      () => { },
      () => this.addApplication());
  }

  addApplication() {
    this.applicationService
      .addApplication(this.applicationForm.value)
      .subscribe(
        (res) => {
          this.router.navigate(["dashboard"]);
          this.toastr.success("Votre demande a été envoyée", "succès");
        },
        (err) => {
          console.log(err);
          this.toastr.error("Votre demande n'a pas été envoyée", "error");
        }
      );
  }

  redirect() {
    this.router.navigate(["/dashboard"]);
  }

  // convenience getter for easy access to form fields
  get registerFormControl() {
    return this.applicationForm.controls;
  }
}
