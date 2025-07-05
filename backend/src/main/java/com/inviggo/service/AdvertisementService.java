package com.inviggo.service;

import com.inviggo.dto.AdvertisementDto;
import com.inviggo.exception.ResourceNotFoundException;
import com.inviggo.model.Advertisement;
import com.inviggo.model.Category;
import com.inviggo.model.User;
import com.inviggo.repository.AdvertisementRepository;
import com.inviggo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AdvertisementService {

    @Autowired
    private AdvertisementRepository advertisementRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<AdvertisementDto> searchAdvertisements(
            String category, 
            String title, 
            Double minPrice, 
            Double maxPrice,
            Long userId,
            Pageable pageable) {
        
        Category categoryEnum = null;
        if (category != null) {
            try {
                categoryEnum = Category.valueOf(category.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Handle invalid category or leave as null to ignore
            }
        }

        if (userId != null) {
            return advertisementRepository.findByUser_Id(userId, pageable)
                    .map(this::convertToDto);
        } else {
            return advertisementRepository.searchAdvertisements(
                    categoryEnum, 
                    title, 
                    minPrice, 
                    maxPrice, 
                    pageable)
                    .map(this::convertToDto);
        }
    }

    public AdvertisementDto getAdvertisementById(Long id) {
        Advertisement advertisement = advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement not found"));
        return convertToDto(advertisement);
    }

    public AdvertisementDto createAdvertisement(AdvertisementDto advertisementDto) {
        User currentUser = getCurrentUser();
        
        Advertisement advertisement = new Advertisement();
        advertisement.setTitle(advertisementDto.getTitle());
        advertisement.setDescription(advertisementDto.getDescription());
        advertisement.setImageUrl(advertisementDto.getImageUrl());
        advertisement.setPrice(advertisementDto.getPrice());
        advertisement.setCategory(Category.valueOf(advertisementDto.getCategory().toUpperCase()));
        advertisement.setCity(advertisementDto.getCity());
        advertisement.setPostingDate(LocalDateTime.now());
        advertisement.setUser(currentUser);

        Advertisement savedAd = advertisementRepository.save(advertisement);
        return convertToDto(savedAd);
    }

    public AdvertisementDto updateAdvertisement(Long id, AdvertisementDto advertisementDto) {
        Advertisement advertisement = advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement not found"));

        User currentUser = getCurrentUser();
        if (!advertisement.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only edit your own advertisements");
        }

        advertisement.setTitle(advertisementDto.getTitle());
        advertisement.setDescription(advertisementDto.getDescription());
        advertisement.setImageUrl(advertisementDto.getImageUrl());
        advertisement.setPrice(advertisementDto.getPrice());
        advertisement.setCategory(Category.valueOf(advertisementDto.getCategory().toUpperCase()));
        advertisement.setCity(advertisementDto.getCity());

        Advertisement updatedAd = advertisementRepository.save(advertisement);
        return convertToDto(updatedAd);
    }

    public void deleteAdvertisement(Long id) {
        Advertisement advertisement = advertisementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Advertisement not found"));

        User currentUser = getCurrentUser();
        if (!advertisement.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only delete your own advertisements");
        }

        advertisementRepository.delete(advertisement);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private AdvertisementDto convertToDto(Advertisement advertisement) {
        AdvertisementDto dto = new AdvertisementDto();
        dto.setId(advertisement.getId());
        dto.setTitle(advertisement.getTitle());
        dto.setDescription(advertisement.getDescription());
        dto.setImageUrl(advertisement.getImageUrl());
        dto.setPrice(advertisement.getPrice());
        dto.setCategory(advertisement.getCategory().name());
        dto.setCity(advertisement.getCity());
        dto.setPostingDate(advertisement.getPostingDate());
        dto.setUserId(advertisement.getUser().getId());
        dto.setUsername(advertisement.getUser().getUsername());
        dto.setUserPhone(advertisement.getUser().getPhone());
        return dto;
    }
}