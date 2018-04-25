export class Training {
    trainingId: number;
    thumbnailUrl: string;
    name: string;
    description: string;
    status: string;
    jobLevels: string[];

    constructor(data?: any) {
        if (data !== undefined) {
            this.trainingId = data['TrainingId'] !== undefined ? data['TrainingId'] : null;
            this.name = data['Name'] !== undefined ? data['Name'] : null;
            this.description = data['Description'] !== undefined ? data['Description'] : null;
            this.status = data['Status'] !== undefined ? data['Status'] : null;
            this.thumbnailUrl = data['ThumbnailUrl'] !== undefined ? data['ThumbnailUrl'] : null;
            this.jobLevels = data['JobLevels'] !== undefined ? data['JobLevels'] : null;
        }
    }

    static fromJS(data: any): Training {
        return new Training(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data['TrainingId'] = this.trainingId !== undefined ? this.trainingId : null;
        data['Name'] = this.name !== undefined ? this.name : null;
        data['Description'] = this.description !== undefined ? this.description : null;
        data['Status'] = this.status !== undefined ? this.status : null;
        data['ThumbnailUrl'] = this.thumbnailUrl !== undefined ? this.thumbnailUrl : null;
        data['JobLevels'] = this.jobLevels !== undefined ? this.jobLevels : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        const json = this.toJSON();
        return new Training(JSON.parse(json));
    }
}



