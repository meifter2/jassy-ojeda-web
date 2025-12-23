import { Component } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactoComponent {

  public sendEmail(e: Event) {
    e.preventDefault();

    const serviceID = 'service_g3othsh';
    const templateID = 'template_bn8nkvo';
    const publicKey = 'HSyyE82N248F9D248'; // <--- PEGA TU PUBLIC KEY AQUÍ

    emailjs.sendForm(serviceID, templateID, e.target as HTMLFormElement, publicKey)
      .then((result: EmailJSResponseStatus) => {
        alert('¡Mensaje enviado con éxito! 🌸');
        (e.target as HTMLFormElement).reset();
      }, (error: any) => {
        alert('Hubo un error al enviar el mensaje. Revisa los permisos de Gmail.');
        console.error('Error de EmailJS:', error);
      });
  }
}