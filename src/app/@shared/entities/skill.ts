export class Skill {
    employeedId: string;
    name: string;
    description: string;
    thumbnailUrl: string;
    rating: number;

    constructor(data?: any) {
        if (data !== undefined) {
            this.employeedId = data['employeeId'] !== undefined ? data['employeeId'] : null;
            this.name = data['name'] !== undefined ? data['name'] : null;
            this.description = data['description'] !== undefined ? data['description'] : null;
            this.rating = data['rating'] !== undefined ? data['rating'] : null;
            this.thumbnailUrl = data['thumbnailUrl'] !== undefined ? data['thumbnailUrl'] : null;
        }
    }

    static fromJS(data: any): Skill {
        return new Skill(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data['Id'] = this.employeedId !== undefined ? this.employeedId : null;
        data['Name'] = this.name !== undefined ? this.name : null;
        data['Description'] = this.description !== undefined ? this.description : null;
        data['Rating'] = this.rating !== undefined ? this.rating : null;
        data['ThumbnailUrl'] = this.thumbnailUrl !== undefined ? this.thumbnailUrl : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        const json = this.toJSON();
        return new Skill(JSON.parse(json));
    }
}
