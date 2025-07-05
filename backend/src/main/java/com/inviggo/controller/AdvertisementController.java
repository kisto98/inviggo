package com.inviggo.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.inviggo.dto.AdvertisementDto;
import com.inviggo.service.AdvertisementService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/ads")
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    public AdvertisementController(AdvertisementService advertisementService) {
        this.advertisementService = advertisementService;
    }

    @GetMapping
    public ResponseEntity<Page<AdvertisementDto>> getAllAdvertisements(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Long userId,
            @PageableDefault(size = 20) Pageable pageable) {
        
        return ResponseEntity.ok(advertisementService.searchAdvertisements(
                category, title, minPrice, maxPrice, userId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdvertisementDto> getAdvertisementById(@PathVariable Long id) {
        return ResponseEntity.ok(advertisementService.getAdvertisementById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<AdvertisementDto> createAdvertisement(
            @Valid @RequestBody AdvertisementDto advertisementDto) {
        return ResponseEntity.ok(advertisementService.createAdvertisement(advertisementDto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<AdvertisementDto> updateAdvertisement(
            @PathVariable Long id,
            @Valid @RequestBody AdvertisementDto advertisementDto) {
        return ResponseEntity.ok(advertisementService.updateAdvertisement(id, advertisementDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable Long id) {
        advertisementService.deleteAdvertisement(id);
        return ResponseEntity.noContent().build();
    }
}
