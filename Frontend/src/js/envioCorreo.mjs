
import { Resend } from 'resend';
const resend = new Resend('re_MxJiAsPv_MvfXgmSb83QrFrE1GX2Dj7EF');

(async function() {
  try {
    const data = await resend.emails.send({
      from: 'ProviSoft <onboarding@resend.dev>',
      to: ['laucamilavega@gmail.com'],
      subject: 'Hello World',
      html: '<strong>It works!</strong>'
    });

    
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();