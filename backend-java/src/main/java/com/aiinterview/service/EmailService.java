package com.aiinterview.service;

import com.aiinterview.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username:noreply@aiinterview.com}")
    private String fromEmail;
    
    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;
    
    @Async
    public void sendInterviewInvitation(String toEmail, String candidateName, 
                                       String temporaryPassword, String interviewType) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Interview Invitation - AI Interview Platform");
            
            String htmlContent = buildInvitationEmail(candidateName, toEmail, temporaryPassword, interviewType);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            log.info("Interview invitation email sent to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send interview invitation email to: {}", toEmail, e);
        }
    }
    
    @Async
    public void sendAssessmentNotification(String toEmail, String candidateName,
                                          String assessmentTitle, String deadline) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("New Assessment Available - AI Interview Platform");
            
            String htmlContent = buildAssessmentEmail(candidateName, assessmentTitle, deadline);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            log.info("Assessment notification email sent to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send assessment notification email to: {}", toEmail, e);
        }
    }
    
    @Async
    public void sendPasswordResetConfirmation(String toEmail, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Password Updated - AI Interview Platform");
            
            String htmlContent = buildPasswordResetEmail(userName);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            log.info("Password reset confirmation email sent to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send password reset confirmation email to: {}", toEmail, e);
        }
    }
    
    @Async
    public void sendPasswordResetEmail(String toEmail, String userName, String resetToken) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request - AI Interview Platform");
            
            String htmlContent = buildPasswordResetRequestEmail(userName, resetToken);
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            log.info("Password reset email sent to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send password reset email to: {}", toEmail, e);
        }
    }
    
    private String buildInvitationEmail(String candidateName, String email, 
                                       String password, String interviewType) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #4F46E5 0%, #9333EA 100%); 
                             color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; }
                    .credentials-box { background: white; border-left: 4px solid #4F46E5; 
                                      padding: 20px; margin: 20px 0; border-radius: 5px; }
                    .button { display: inline-block; padding: 12px 30px; background: #4F46E5; 
                             color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                    .warning { background: #FEF3C7; padding: 15px; border-radius: 5px; margin: 20px 0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🎯 Interview Invitation</h1>
                        <p>AI Interview Platform</p>
                    </div>
                    <div class="content">
                        <h2>Hello %s,</h2>
                        <p>You have been invited to take a <strong>%s</strong> interview on our AI-powered platform.</p>
                        
                        <div class="credentials-box">
                            <h3>📧 Your Login Credentials:</h3>
                            <p><strong>Username/Email:</strong> %s</p>
                            <p><strong>Temporary Password:</strong> <code style="background: #e5e7eb; padding: 5px 10px; border-radius: 3px;">%s</code></p>
                        </div>
                        
                        <div class="warning">
                            <strong>⚠️ Important:</strong> For security reasons, please change your password after your first login.
                        </div>
                        
                        <p>Click the button below to access the platform and begin your interview:</p>
                        
                        <a href="%s/login" class="button">Login to Platform</a>
                        
                        <h3>What to expect:</h3>
                        <ul>
                            <li>AI-powered interview questions</li>
                            <li>Real-time feedback and assessment</li>
                            <li>Comprehensive performance analytics</li>
                        </ul>
                        
                        <p>Good luck with your interview!</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 AI Interview Platform. All rights reserved.</p>
                        <p>If you have any questions, contact us at support@aiinterview.com</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(candidateName, interviewType, email, password, frontendUrl);
    }
    
    private String buildAssessmentEmail(String candidateName, String assessmentTitle, String deadline) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #9333EA 0%, #4F46E5 100%); 
                             color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; }
                    .assessment-box { background: white; border: 2px solid #9333EA; 
                                     padding: 20px; margin: 20px 0; border-radius: 5px; }
                    .button { display: inline-block; padding: 12px 30px; background: #9333EA; 
                             color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📋 New Assessment Available</h1>
                        <p>AI Interview Platform</p>
                    </div>
                    <div class="content">
                        <h2>Hello %s,</h2>
                        <p>A new assessment has been assigned to you.</p>
                        
                        <div class="assessment-box">
                            <h3>Assessment Details:</h3>
                            <p><strong>Title:</strong> %s</p>
                            <p><strong>Deadline:</strong> %s</p>
                        </div>
                        
                        <p>Please log in to your dashboard to view and complete the assessment.</p>
                        
                        <a href="%s/login" class="button">Go to Dashboard</a>
                        
                        <p>Make sure to complete the assessment before the deadline to ensure timely evaluation.</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 AI Interview Platform. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(candidateName, assessmentTitle, deadline, frontendUrl);
    }
    
    private String buildPasswordResetEmail(String userName) {
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
                             color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9fafb; padding: 30px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>✅ Password Updated Successfully</h1>
                    </div>
                    <div class="content">
                        <h2>Hello %s,</h2>
                        <p>Your password has been successfully updated.</p>
                        <p>If you did not make this change, please contact our support team immediately.</p>
                    </div>
                    <div class="footer">
                        <p>© 2026 AI Interview Platform. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(userName);
    }
    
    private String buildPasswordResetRequestEmail(String userName, String resetToken) {
        String resetUrl = frontendUrl + "/reset-password?token=" + resetToken;
        
        return """
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #000000; background-color: #ffffff; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
                    .header { background: linear-gradient(135deg, #4F46E5 0%, #9333EA 100%); 
                             color: #ffffff; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .header h1 { color: #ffffff; margin: 0; }
                    .header p { color: #ffffff; margin: 5px 0 0 0; }
                    .content { background: #f9fafb; padding: 30px; color: #000000; }
                    .content h2 { color: #000000; }
                    .content p { color: #000000; }
                    .content li { color: #000000; }
                    .button { display: inline-block; padding: 12px 30px; background: #4F46E5; 
                             color: #ffffff !important; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; padding: 20px; color: #666666; font-size: 14px; background-color: #ffffff; }
                    .warning { background: #FEF3C7; padding: 15px; border-radius: 5px; margin: 20px 0; color: #000000; }
                    .warning strong { color: #000000; }
                    .token-box { background: #ffffff; border: 2px solid #4F46E5; 
                                padding: 15px; margin: 20px 0; border-radius: 5px; word-break: break-all; }
                    .token-box small { color: #4F46E5; }
                </style>
            </head>
            <body style="background-color: #ffffff; color: #000000;">
                <div class="container">
                    <div class="header">
                        <h1 style="color: #ffffff;">🔐 Password Reset Request</h1>
                        <p style="color: #ffffff;">AI Interview Platform</p>
                    </div>
                    <div class="content">
                        <h2 style="color: #000000;">Hello %s,</h2>
                        <p style="color: #000000;">We received a request to reset your password. Click the button below to create a new password:</p>
                        
                        <a href="%s" class="button" style="color: #ffffff;">Reset Password</a>
                        
                        <p style="color: #000000;">Or copy and paste this link into your browser:</p>
                        <div class="token-box">
                            <small style="color: #4F46E5;">%s</small>
                        </div>
                        
                        <div class="warning">
                            <strong style="color: #000000;">⚠️ Important:</strong> <span style="color: #000000;">This link will expire in 24 hours. If you didn't request a password reset, please ignore this email or contact support if you have concerns.</span>
                        </div>
                        
                        <p style="color: #000000;">For security reasons, we recommend:</p>
                        <ul>
                            <li style="color: #000000;">Use a strong, unique password</li>
                            <li style="color: #000000;">Don't share your password with anyone</li>
                            <li style="color: #000000;">Enable two-factor authentication if available</li>
                        </ul>
                    </div>
                    <div class="footer">
                        <p style="color: #666666;">© 2026 AI Interview Platform. All rights reserved.</p>
                        <p style="color: #666666;">If you have any questions, contact us at support@aiinterview.com</p>
                    </div>
                </div>
            </body>
            </html>
            """.formatted(userName, resetUrl, resetUrl);
    }
}
