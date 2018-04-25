export class Lesson {
    lessonNum: number;
    lessonName: string;
    resc: string;
    vidlength: string;
    isFinished: boolean;
    url: string;
    constructor(data?: any) {
        if (data !== undefined) {
            this.lessonNum = data['LessonNumber'] !== undefined ? data['LessonNumber'] : null;
            this.lessonName = data['LessonName'] !== undefined ? data['LessonName'] : null;
            this.resc = data['Resources'] !== undefined ? data['Resources'] : null;
            this.vidlength = data['VideoLength'] !== undefined ? data['VideoLength'] : null;
            this.isFinished = data['IsFinished'] !== undefined ? data['IsFinished'] : null;
            this.url = data['VideoURL'] !== undefined ? data['VideoURL'] : null;
        }
    }

    static fromJS(data: any): Lesson {
        return new Lesson(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data['LessonNumber'] = this.lessonNum !== undefined ? this.lessonNum : null;
        data['LessonName'] = this.lessonName !== undefined ? this.lessonName : null;
        data['Resources'] = this.resc !== undefined ? this.resc : null;
        data['VideoLength'] = this.vidlength !== undefined ? this.vidlength : null;
        data['IsFinished'] = this.isFinished !== undefined ? this.isFinished : null;
        data['VideoURL'] = this.url !== undefined ? this.url : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        const json = this.toJSON();
        return new Lesson(JSON.parse(json));
    }
}



