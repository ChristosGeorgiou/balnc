import { Component, Input, OnInit, NgZone } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ProjectsService } from '../../services/projects.service';
import { RxProject } from '../../data/project';

@Component({
    selector: 'app-team-projects-project-create',
    templateUrl: './create-project.component.html'
})
export class CreateProjectComponent implements OnInit {

    form: FormGroup;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private projectsService: ProjectsService,
    ) { }

    async ngOnInit() {
        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.maxLength(100)]],
            description: ["", []],
        });
    }

    onSubmit() {
        const formModel = this.form.value;
        const projectId = formModel.project
        this.projectsService
            .addProject(formModel.name, formModel.description)
            .then(() => {
                this.activeModal.close()
            })
    }
}