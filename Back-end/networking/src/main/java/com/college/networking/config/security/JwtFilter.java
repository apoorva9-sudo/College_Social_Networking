package com.college.networking.config.security;

import com.college.networking.entity.User;
import com.college.networking.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Allow CORS preflight requests to pass through
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String email = null;

        // Step 1: Extract token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            email = jwtUtil.extractEmail(token);
        }

        // Step 2: Validate and set authentication
        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            User user = userRepository.findByEmail(email).orElse(null);

            // User doesn't exist
            if (user == null) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            // User is inactive
            if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return;
            }

            List<SimpleGrantedAuthority> authorities =
                    user.getRoles()
                            .stream()
                            .map(role ->
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + role.getRoleName()
                                    )
                            )
                            .toList();


            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            authorities
                    );

            SecurityContextHolder.getContext()
                    .setAuthentication(authToken);

            // to check debuggging purpose
            System.out.println(
                    "USER: " + email +
                            " | AUTHORITIES: " + authorities
            );
            System.out.println(
                    "AUTHENTICATION: " +
                            SecurityContextHolder.getContext()
                                    .getAuthentication()
            );
            //end of checking de-bugging purpose
        }

        filterChain.doFilter(request, response);
    }
}