export class Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    imageUrl: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.employeeId = data['id'] !== undefined ? data['id'] : null;
            this.firstName = data['firstName'] !== undefined ? data['firstName'] : null;
            this.lastName = data['lastName'] !== undefined ? data['lastName'] : null;
            this.email = data['email'] !== undefined ? data['email'] : null;
            this.jobTitle = data['jobTitle'] !== undefined ? data['jobTitle'] : null;

            // TODO: Fix mapping for this field.
            this.imageUrl = data['photo'] !== undefined ? data['photo'] : null;
        }
    }

    static fromJS(data: any): Employee {
        return new Employee(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data['Id'] = this.employeeId !== undefined ? this.employeeId : null;
        data['FirstName'] = this.firstName !== undefined ? this.firstName : null;
        data['LastName'] = this.lastName !== undefined ? this.lastName : null;
        data['Email'] = this.email !== undefined ? this.email : null;
        data['JobTitle'] = this.jobTitle !== undefined ? this.jobTitle : null;
        data['Photo'] = this.imageUrl !== undefined ? this.imageUrl : null;
        return data;
    }

    toJSON() {
        return JSON.stringify(this.toJS());
    }

    clone() {
        const json = this.toJSON();
        return new Employee(JSON.parse(json));
    }
}
