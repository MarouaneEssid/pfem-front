import { Component, TemplateRef } from "@angular/core";
import { User } from '../../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { UserService } from "../../services/user.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Application } from "../../models/application";
import { Subject } from "../../models/subject";
import { ApplicationService } from "../../services/application.service";
import { SubjectService } from "../../services/subject.service";

@Component({
  templateUrl: "listusers.component.html",
})
export class ListUsersComponent {
  updateForm: FormGroup;
  users: User[];
  applications: Application[];
  subjects: Subject[];
  currentUser: User;
  modalRef: BsModalRef;
  nbCollab = 0;
  nbStudent = 0;
  nbApplications = 0;
  nbSubjects = 0;
  constructor(
    private toastr: ToastrService,
    private modalService: BsModalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private applicationsService: ApplicationService,
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.getUsers();
    this.applicationsService.getAllApplications().subscribe(applications => this.nbApplications = applications.length);
    this.subjectService.getSubjects().subscribe(subjects => this.nbSubjects = subjects.length);
  }

  buildForm() {
    this.updateForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }],
      password: ['', Validators.minLength(6)],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      role: [],
      school: ['']
    });
  }

  getUsers(): void {
    this.nbStudent = 0;
    this.nbCollab = 0;
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        for (let user of users) {
          if (user.role.id == 2) {
            this.nbCollab++;
          }
          if (user.role.id == 3) {
            this.nbStudent++;
          }
        }
      },
      error => console.log(error)
    );
  }

  deleteUser(user: User) {
    let index = this.users.indexOf(user);
    this.userService.deleteUser(user.id).subscribe(
      success => {
        this.users.splice(index, 1);
        if(user.role.id == 3) {
          this.nbStudent--;
        }
        if(user.role.id == 2) {
          this.nbCollab--;
        }
        this.toastr.success("utilisateur supprimé", "succès");
      },
      error => {
        console.log(error);
        this.toastr.error("échec de la suppression", "erreur");
      }
    );
  }

  openUser(template: TemplateRef<any>, user: User) {
    this.currentUser = user;
    this.updateForm.patchValue(user);
    this.role.setValue(JSON.stringify(user.role));
    this.password.setValue("");
    this.modalRef = this.modalService.show(template);
  }

  updateUser() {
    let index = this.users.indexOf(this.currentUser);
    this.currentUser = { ...this.currentUser, ...this.updateForm.value };
    this.currentUser.role = JSON.parse(this.role.value);
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(
      success => {
        this.modalRef.hide();
        this.users.splice(index, 1, this.currentUser);
        this.getUsers();
        this.toastr.success("Les modifications ont été enregistrées", "succès");
      },
      error => {
        console.log(error);
        this.toastr.error("Echec de la mis à jour", "erreur");
      }
    );
  }

  modifyPassword(template: TemplateRef<any>, user: User) {
    this.currentUser = user;
    this.password.setValue("");
    this.email.setValue(this.currentUser.email);
    this.modalRef = this.modalService.show(template);
  }

  updatePassword() {
    if (this.updateForm.value.password != null && this.updateForm.value.password.length > 0) {
      this.userService.updateUserPassword(this.currentUser.id, this.updateForm.value.password).subscribe(
        success => {
          this.modalRef.hide();
          this.toastr.success("Le mot de passe a été modifié", "succès");
        },
        error => {
          console.log(error);
          this.toastr.error("Le mot de passe n'a pas été modifié", "erreur");
        }
      );
    } else {
      this.modalRef.hide();
    }
  }

  // getters
  get email(): AbstractControl {
    return this.updateForm.get('email');
  }
  get password(): AbstractControl {
    return this.updateForm.get('password');
  }
  get firstname(): AbstractControl {
    return this.updateForm.get('firstname');
  }
  get lastname(): AbstractControl {
    return this.updateForm.get('lastname');
  }
  get school(): AbstractControl {
    return this.updateForm.get('school');
  }
  get role(): AbstractControl {
    return this.updateForm.get('role');
  }
  cancel() {
    this.modalRef.hide();
  }
}
