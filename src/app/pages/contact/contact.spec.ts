import { ComponentFixture, TestBed } from '@angular/core/testing';
import { type EmailJSResponseStatus } from '@emailjs/browser';

import { ContactoComponent } from './contact';
import { ContactService } from './contact.service';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    contactService = jasmine.createSpyObj<ContactService>('ContactService', ['send']);

    await TestBed.configureTestingModule({
      imports: [ContactoComponent],
      providers: [{ provide: ContactService, useValue: contactService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the contact form', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('CONTACTO');
    expect(element.querySelector('form')).not.toBeNull();
    expect(element.querySelector('button[type="submit"]')).not.toBeNull();
  });

  it('should send and reset the form after a successful response', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form') as HTMLFormElement;
    const nameInput = element.querySelector('input[name="from_name"]') as HTMLInputElement;
    const response = { status: 200, text: 'OK' } as EmailJSResponseStatus;
    nameInput.value = 'Jassy';
    contactService.send.and.resolveTo(response);

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(contactService.send).toHaveBeenCalledOnceWith(form);
    expect(nameInput.value).toBe('');
    expect(component.submitStatus).toBe('success');
    expect(element.querySelector('.submit-status--success')?.textContent).toContain(
      'Mensaje enviado con éxito',
    );
  });

  it('should show an error and keep the form values when sending fails', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form') as HTMLFormElement;
    const nameInput = element.querySelector('input[name="from_name"]') as HTMLInputElement;
    const error = new Error('EmailJS unavailable');
    nameInput.value = 'Jassy';
    contactService.send.and.rejectWith(error);
    spyOn(console, 'error');

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(nameInput.value).toBe('Jassy');
    expect(component.submitStatus).toBe('error');
    expect(console.error).toHaveBeenCalledWith('Error de EmailJS:', error);
    expect(element.querySelector('.submit-status--error')?.textContent).toContain(
      'No se ha podido enviar el mensaje',
    );
  });

  it('should disable the button and prevent duplicate submissions while sending', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const form = element.querySelector('form') as HTMLFormElement;
    const button = element.querySelector('button[type="submit"]') as HTMLButtonElement;
    const response = { status: 200, text: 'OK' } as EmailJSResponseStatus;
    let resolveRequest!: (value: EmailJSResponseStatus) => void;
    contactService.send.and.returnValue(
      new Promise<EmailJSResponseStatus>((resolve) => {
        resolveRequest = resolve;
      }),
    );

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('ENVIANDO...');

    form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
    expect(contactService.send).toHaveBeenCalledTimes(1);

    resolveRequest(response);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
    expect(button.textContent).toContain('ENVIAR MAGIA');
  });
});
