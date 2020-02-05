import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    const url = this.rootUrl + '/emails';

    return this.http.get<EmailSummary[]>(url);
  }

  getEmail(id: string) {
    const url = `${this.rootUrl}/emails/${id}`;

    return this.http.get<Email>(url);
  }

  sendEmail(email: Email) {
    const url = this.rootUrl + '/emails';

    return this.http.post(url, email);
  }
}
