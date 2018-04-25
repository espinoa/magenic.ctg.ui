import { Component, OnInit, Input } from '@angular/core';
import { Training } from '@shared/entities/training';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.less']
})
export class TrainingComponent implements OnInit {

  @Input() training: Training;
  @Input() hasEditAccess;
  public statusClass;

  constructor(private router: Router) { }

  ngOnInit() {
    // set the class to render status. Sample format course-in-progress
    this.statusClass = this.training.status ? 'course-' + this.training.status.replace(' ', '-').toLocaleLowerCase() : '';
  }

  onCourseEdit(e) {
    // TODO: Route to Edit page
    this.router.navigateByUrl(`/course/edit/${this.training.trainingId}`);
    console.log('on course edit click');
    console.log('training ID:' + this.training.trainingId);
  }

  onTakeCourse(e) {
    // TODO: Route to Take Course page
    this.router.navigateByUrl(`/course/${this.training.trainingId}`);
    console.log('on take course click');
    console.log('training ID:' + this.training.trainingId);
  }
}
