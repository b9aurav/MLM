import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Subscription, interval } from 'rxjs';
import jwt_decode from 'jwt-decode'
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userData: any;
    private tokenKey = 'access_token';
    private tokenExpirationSubscription: Subscription;

    constructor(private http: HttpClient) { }

    // Login and get the access token
    public login(credentials): Promise<{ isAdmin: boolean, isAuthenticated: boolean, message: string }> {
        const loginUrl = `${environment.apiBaseUrl}/api/validateUser`;

        return this.http.post<{ metadata: any, token: string }>(loginUrl, credentials).toPromise()
            .then(response => {
                const token = response.token;
                this.saveToken(token);
                if (!response.metadata.isAdmin) {
                    this.loadUserData();
                }
                return response.metadata;
            });
    }

    async loadUserData() {
        const decoded: any = jwt_decode(this.getToken());
        const param = {
            "param": {
                "username": decoded.username
            }
        };
    
        try {
            const response = await this.http.post<{ data: any, message: string }>(environment.apiBaseUrl + '/api/GetUserDetails', param).toPromise();
            this.userData = response.data[0];
        } catch (error) {
            console.error(error);
        }
    }
    
    public getLoggedUser(): string {
        const decoded: any = jwtDecode(this.getToken());
        return decoded.username;
    }

    // Save the access token to local storage
    saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    // Get the access token from local storage
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    // Remove the access token from local storage
    removeToken(): void {
        localStorage.removeItem(this.tokenKey);
    }

    public startTokenExpirationTimer(): void {
        this.stopTokenExpirationTimer(); // Stop any existing expiration timer

        // Get the token expiration time
        const token = this.getToken();
        const decoded: any = jwt_decode(token);
        const expirationTime = decoded.exp * 1000; // Convert expiration time to milliseconds

        // Calculate the time remaining before expiration
        const now = Date.now();
        const timeRemaining = expirationTime - now;

        // Set up a timer to log the user out
        this.tokenExpirationSubscription = interval(timeRemaining).subscribe(() => {
            this.logout(); // Implement the method to log the user out
        });
    }

    private stopTokenExpirationTimer(): void {
        if (this.tokenExpirationSubscription) {
            this.tokenExpirationSubscription.unsubscribe();
            this.tokenExpirationSubscription = null;
        }
    }

    async isAuthenticated(): Promise<boolean> {
        const token = this.getToken();

        if (token) {
            const decoded: any = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            const isTokenValid = decoded.exp > currentTime;

            if (!isTokenValid) {
                this.logout(); // Token has expired, log the user out
                this.stopTokenExpirationTimer(); // Stop token expiration timer
            }

            await this.loadUserData();
            return isTokenValid;
        }

        return false; // No token found, user is not authenticated
    }

    public logout(): void {
        this.removeToken();
    }

    public isUserAdmin(): boolean {
        const decoded: any = jwt_decode(this.getToken());
        return decoded.isAdmin;
    }
}
