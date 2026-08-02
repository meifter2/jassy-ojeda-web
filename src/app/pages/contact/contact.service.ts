import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

import { EMAILJS_CONFIG } from './contact.config';

@Injectable({ providedIn: 'root' })
export class ContactService {
  send(form: HTMLFormElement): Promise<EmailJSResponseStatus> {
    return emailjs.sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form,
      EMAILJS_CONFIG.publicKey,
    );
  }
}
