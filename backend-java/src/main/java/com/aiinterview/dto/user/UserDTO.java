package com.aiinterview.dto.user;

import com.aiinterview.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    
    private Long id;
    private String email;
    private String name;
    private String role;
    private String authProvider;
    private String profilePicture;
    private String phoneNumber;
    private String bio;
    private Boolean isActive;
    private LocalDateTime createdAt;
    
    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole().name())
                .authProvider(user.getAuthProvider().name())
                .profilePicture(user.getProfilePicture())
                .phoneNumber(user.getPhoneNumber())
                .bio(user.getBio())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
