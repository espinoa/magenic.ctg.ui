import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TrainingComponent } from '@shared/components/training/training.component';

import { TrainingService } from '@shared/services/training/training.service';
import { LoaderService } from '@core/loader/loading-indicator.service';

import { TrainingStatus } from '@core/constants/training-status-constants';
import { UserInfo } from '@shared/entities/user-info';
import { Training } from '@shared/entities/training';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.less']
})
export class TrainingListComponent implements OnInit {

  @Input() userInfo: UserInfo;
  @Input() keyword: string;
  public trainings: Training[] = [];

  constructor(
    private trainingService: TrainingService,
    private loaderService: LoaderService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userInfo'] && this.userInfo) {
      this.loaderService.show();
      this.trainingService.getEmployeeTrainings(this.userInfo.employeeId)
        .subscribe(
            trainings => {
              this.trainings = trainings;
              this.loaderService.hide();
            }
        );
    }
  }

  public getTrainingsByStatus(status?: string): Training[] {
    let filteredTrainigns: Training[] = [];

    if (this.trainings && this.trainings.length > 0) {
      filteredTrainigns = status ? this.trainings.filter(_ => _.status === status) : this.trainings;
    } else {
      return [];
    }

    if (this.keyword && this.keyword.length > 0) {
      filteredTrainigns = this.getTrainingsByKeyword(filteredTrainigns);
    }

    return filteredTrainigns;
  }

  public getTrainingsByKeyword(trainings: Training[]): Training[] {
    // List of search keys to be used in search.
    const keys = ['name', 'description'];
    
    return trainings.filter(item =>
      keys.some(
        k => item[k] != null && item[k].toString().toLowerCase()
        .includes(this.keyword.toLowerCase())
      )
    );
  }
}
