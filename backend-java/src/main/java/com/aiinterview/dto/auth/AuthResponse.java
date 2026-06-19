package com.aiinterview.dto.auth;

import com.aiinterview.dto.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String message;
    private String accessToken;
    private UserDTO user;
}
