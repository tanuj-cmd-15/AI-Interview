package com.aiinterview.service;

import com.aiinterview.dto.auth.AuthResponse;
import com.aiinterview.dto.auth.ForgotPasswordRequest;
import com.aiinterview.dto.auth.LoginRequest;
import com.aiinterview.dto.auth.RegisterRequest;
import com.aiinterview.dto.auth.ResetPasswordRequest;
import com.aiinterview.dto.user.UserDTO;
import com.aiinterview.exception.BusinessException;
import com.aiinterview.model.PasswordResetToken;
import com.aiinterview.model.User;
import com.aiinterview.repository.PasswordResetTokenRepository;
import com.aiinterview.repository.UserRepository;
import com.aiinterview.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email already registered");
        }
        
        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .name(request.getName())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(User.UserRole.valueOf(request.getRole().toUpperCase()))
                .authProvider(User.AuthProvider.LOCAL)
                .isActive(true)
                .build();
        
        user = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        return AuthResponse.builder()
                .message("Registration successful")
                .accessToken(token)
                .user(UserDTO.fromEntity(user))
                .build();
    }
    
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Invalid email or password"));
        
        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BusinessException("Invalid email or password");
        }
        
        // Check if user is active
        if (!user.getIsActive()) {
            throw new BusinessException("Account is inactive");
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        return AuthResponse.builder()
                .message("Login successful")
                .accessToken(token)
                .user(UserDTO.fromEntity(user))
                .build();
    }
    
    @Transactional(readOnly = true)
    public UserDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("User not found"));
        
        return UserDTO.fromEntity(user);
    }
    
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("User not found with this email"));
        
        // Delete any existing tokens for this user
        tokenRepository.deleteByUser(user);
        
        // Generate reset token
        String token = UUID.randomUUID().toString();
        
        // Create and save token
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiresAt(LocalDateTime.now().plusHours(24))
                .used(false)
                .createdAt(LocalDateTime.now())
                .build();
        
        tokenRepository.save(resetToken);
        
        // Send email with reset link
        emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), token);
    }
    
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new BusinessException("Invalid or expired reset token"));
        
        // Check if token is expired
        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            tokenRepository.delete(resetToken);
            throw new BusinessException("Reset token has expired");
        }
        
        // Check if token was already used
        if (resetToken.getUsed()) {
            throw new BusinessException("Reset token has already been used");
        }
        
        // Update password
        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        
        // Mark token as used
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
        
        // Send confirmation email
        emailService.sendPasswordResetConfirmation(user.getEmail(), user.getName());
    }
}
