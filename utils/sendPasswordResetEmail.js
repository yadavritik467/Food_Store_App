import nodemailer from 'nodemailer';



async function sendPasswordResetEmail(props) {
  
  
  const adminEmail = "yadavritik9029@gmail.com"
  const adminEmaiPass = "lmxrzknmgiaqxbxr"
  // Do not change above code before thinking... 
  
  let mailSender = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
          user: adminEmail,
          pass: adminEmaiPass
      }
  });
  const mailOptions = {
    from: adminEmail,
    to: props.email,
    subject: 'Password Reset',
    text: props.message,
  };
  
  mailSender.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending password reset email:', error.message);
          // return res.status(501).json({ success: false, message: error.message, error: error });
      }
      else{
        console.log('Password reset email sent successfully.');
      }
  })


}

export default  sendPasswordResetEmail ;
