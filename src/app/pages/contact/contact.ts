import { Component, inject } from '@angular/core';

import { ContactService } from './contact.service';

type SubmitStatus = 'idle' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class ContactoComponent {
  private readonly contactService = inject(ContactService);

  isSubmitting = false;
  submitStatus: SubmitStatus = 'idle';

  async sendEmail(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (this.isSubmitting) {
      return;
    }

    const form = event.currentTarget as HTMLFormElement;
    this.isSubmitting = true;
    this.submitStatus = 'idle';

    try {
      await this.contactService.send(form);
      form.reset();
      this.submitStatus = 'success';
    } catch (error: unknown) {
      console.error('Error de EmailJS:', error);
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
}
