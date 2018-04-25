import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { LessonService } from '@shared/services/lesson/lesson.service';
import { Lesson } from '@shared/entities/lesson';
import { LoaderService } from '@core/loader/loading-indicator.service';
import { ChipContent } from '@shared/entities/chipcontent';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CourseLessonComponent implements OnInit, OnDestroy {
  chipContent: ChipContent;
  navOpen: boolean = false;
  lessonList: Lesson[];
  form: FormGroup;
  private trainingId: 0;
  submitAttempt = false;
  videoUrl: string;
  constructor(private titleService: Title,
    private lessonService: LessonService,
    private route: ActivatedRoute,
    private _location: Location,
    private loaderService: LoaderService) {
    this.titleService.setTitle('Lesson Viewer');
  }

  ngOnInit() {
   console.log("course lesson");
   this.videoUrl = "/assets/app/video/intro-video.mp4";
   this.getLessons();
   
   // this.initializeChipLoader();
  }
  back() {
    this._location.back();
  }
  openNav(){
    this.navOpen = !this.navOpen;
  }
  getLessons() {
    console.log(this.trainingId);
    this.loaderService.show();
    this.lessonService.get().subscribe((lesson) => {
      this.lessonList = lesson;
      this.videoUrl = this.lessonList[0].url;
      console.log(lesson);
    });
  }
  bindVideo(url: string){
    console.log("VIDEO CHANGE:" + url);
    this.videoUrl = url;
  }
  ngOnDestroy() {
    
  }
}
