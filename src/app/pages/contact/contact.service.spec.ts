import { TestBed } from '@angular/core/testing';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

import { EMAILJS_CONFIG } from './contact.config';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should send the form using the configured EmailJS account', async () => {
    const form = document.createElement('form');
    const response = { status: 200, text: 'OK' } as EmailJSResponseStatus;
    const sendFormSpy = spyOn(emailjs, 'sendForm').and.resolveTo(response);

    await expectAsync(service.send(form)).toBeResolvedTo(response);

    expect(sendFormSpy).toHaveBeenCalledOnceWith(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form,
      EMAILJS_CONFIG.publicKey,
    );
  });
});
