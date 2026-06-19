package com.aiinterview.security;

import com.aiinterview.model.User;
import com.aiinterview.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        
        log.info("OAuth2 Login successful for email: {}", email);
        
        // Find or create user
        User user = userRepository.findByEmail(email).orElse(null);
        boolean isNewUser = (user == null);
        
        if (isNewUser) {
            user = createNewGoogleUser(email, name);
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        
        // Get frontend URL from environment or use default
        String frontendUrl = System.getenv("FRONTEND_URL");
        if (frontendUrl == null || frontendUrl.isEmpty()) {
            frontendUrl = "http://localhost:5174"; // Updated to port 5174
        }
        
        // If new user with default role, redirect to role selection
        if (isNewUser) {
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/select-role")
                    .queryParam("token", token)
                    .queryParam("email", email)
                    .queryParam("name", name)
                    .queryParam("isNew", "true")
                    .build().toUriString();
            
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // Existing user, redirect to dashboard
            String targetUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth2/redirect")
                    .queryParam("token", token)
                    .queryParam("role", user.getRole().name())
                    .build().toUriString();
            
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }
    
    private User createNewGoogleUser(String email, String name) {
        User user = User.builder()
                .email(email)
                .name(name)
                .passwordHash("") // No password for OAuth users
                .role(User.UserRole.STUDENT) // Default role
                .authProvider(User.AuthProvider.GOOGLE)
                .isActive(true)
                .build();
        
        return userRepository.save(user);
    }
}
