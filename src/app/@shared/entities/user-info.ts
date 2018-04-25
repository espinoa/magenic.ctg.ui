export class UserInfo {
    lastName: string;
    firstName: string;
    role: string;
    sub: string;
    email: string;
    jobTitle: string;
    imageUrl: string;
    employeeId: string;

    constructor(data?: any) {
        if (data !== undefined) {
            this.employeeId = data['Id'] !== undefined ? data['Id'] : null;
            this.firstName = data['FirstName'] !== undefined ? data['FirstName'] : null;
            this.lastName = data['LastName'] !== undefined ? data['LastName'] : null;
            this.role = data['role'] !== undefined ? data['role'] : null;
            this.sub = data['sub'] !== undefined ? data['sub'] : null;
            this.email = data['Email'] !== undefined ? data['Email'] : null;
            this.jobTitle = data['JobTitle'] !== undefined ? data['JobTitle'] : null;
            this.imageUrl = data['Photo'] !== undefined ? data['Photo'] : null;
        }
    }

    static fromJS(data: any): UserInfo {
        return new UserInfo(data);
    }

    toJS(data?: any) {
        data = data === undefined ? {} : data;
        data['Id'] = this.employeeId !== undefined ? this.employeeId : null;
        data['LastName'] = this.lastName !== undefined ? this.lastName : null;
        data['FirstName'] = this.firstName !== undefined ? this.firstName : null;
        data['role'] = this.role !== undefined ? this.role : null;
        data['sub'] = this.sub !== undefined ? this.sub : null;
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
        return new UserInfo(JSON.parse(json));
    }

    public get isSuperUser(): boolean {
        // TODO: 'SuperUser' should be in a constants class.
        return this.role === 'SuperUser';
    }
}
