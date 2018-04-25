import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from '@shared/services/training/training.service';
import { Training } from '@shared/entities/training';
import { LoaderService } from '@core/loader/loading-indicator.service';
import { ChipContent } from '@shared/entities/chipcontent';
import { Location } from '@angular/common';
import { FileService } from '@shared/services/file/file.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  chipContent: ChipContent;

  training: Training;
  form: FormGroup;
  private trainingSubscription: Subscription;
  private trainingId: 0;
  private confirmationDialogComponentRef: MatDialogRef<ConfirmationDialogComponent>;
  submitAttempt = false;
  readonly allowedExtensions = ['.xls', '.xlsx'];

  constructor(private titleService: Title,
    private trainingService: TrainingService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _location: Location,
    private loaderService: LoaderService,
    private fileService: FileService) {
    this.titleService.setTitle('New Course | Technical Case Study');

    this.initForm();
  }

  ngOnInit() {
    if (this.router.url.indexOf('course/edit') >= 0) {
      this.loaderService.show();
      this.route.params.subscribe(params => {
        this.trainingId = params['id'];

        if (this.trainingId) {
          this.getCourse();
        }
      });
    }

    this.initializeChipLoader();
  }

  private initializeChipLoader() {
    this.chipContent = new ChipContent([ // Test data
      'Developer',
      'Senior Developer',
      'Lead Developer',
      'Lead QA',
      'test',
      'testing testing',
      'test 1',
      'test 2'
    ], this.training ? this.training.jobLevels : []);
  }

  private initForm() {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      jobLevels: ['']
    });
  }

  private getCourse() {
    console.log(this.trainingId);
    this.loaderService.show();
    this.trainingSubscription = this.trainingService.get(this.trainingId).subscribe((training) => {
      this.training = Training.fromJS(training);

      this.form.get('name').setValue(this.training.name);
      this.form.get('description').setValue(this.training.description);
      this.form.get('status').setValue(this.training.status);
      this.form.get('jobLevels').setValue(this.training.jobLevels);
      this.loaderService.hide();
    });
  }

  retireCourse(): void {
    this.confirmationDialogComponentRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'confirmation-dialog',
      width: '725px',
      height: '370px',
      data: {
        title: 'WARNING!',
        // tslint:disable-next-line:max-line-length
        message: 'You are about to \'RETIRE\' this course. Make damn sure you know what your doing since there are people who might be intereseted in taking this course.\n\n'
          + 'Now if you are absolutely sure, do and do it then!',
        checkboxMessage: 'Yes, I am abosulutely sure!',
        btnCancel: 'Cancel',
        btnConfirmation: 'Retire'
      }
    });

    this.loaderService.show();
    this.confirmationDialogComponentRef.afterClosed().subscribe(data => {
      if (data && data.userConfirmed) {
        console.log('User Confirmed - do course retire logic');
      } else {
        console.log('User not Conifrmed');
      }
      this.loaderService.hide();
    });
  }

  back() {
    this._location.back();
  }

  removeJobLevel(jobLevel: string, index: number) {
    this.training.jobLevels.splice(index, 1);
  }

  submit(command) {

    this.submitAttempt = true;

    // TODO if command is save do something
    // TODO if command is publish do something
    // Or just create separate method
    this.training.jobLevels = this.chipContent ? this.chipContent.selectedChips : [];

    if (this.form.valid) {
      this.form.get('jobLevels').setValue(this.training.jobLevels);

      // TODO Send to API
    }
  }

  onFilesChange(event): void {
    let validFiles = this.fileService.processFile(event.target.files, this.allowedExtensions);

    if (validFiles)
      this.uploadFile(validFiles[0]);
  }

  uploadFile(file: File): void {
    if (file) {
      console.log(file);
      console.log('TODO: Do File Upload Logic');
    }
  }

  ngOnDestroy() {
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe();
    }
  }
}
