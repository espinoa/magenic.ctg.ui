import { AuthService } from '@core/authentication/auth.service';
import { Observable } from 'Rxjs';

export class AuthServiceStub extends AuthService {
    getRedirectUrl(): string {
        return 'Demo';
    }
}
