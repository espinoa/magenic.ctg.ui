import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Training } from '@shared/entities/training';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.less']
})
export class VideoPlayerComponent implements OnInit, OnChanges {

  @Input() src: string;
  public statusClass;

  constructor(private router: Router) { }

  ngOnInit() {
    // set the class to render status. Sample format course-in-progress
  
  }

  ngOnChanges(){
    
  }
  
}
