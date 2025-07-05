package com.inviggo.repository;

import com.inviggo.model.Advertisement;
import com.inviggo.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    Page<Advertisement> findByUser_Id(Long userId, Pageable pageable);
    
    @Query("SELECT a FROM Advertisement a WHERE " +
           "(:category IS NULL OR a.category = :category) AND " +
           "(:title IS NULL OR LOWER(a.title) LIKE LOWER(concat('%', :title, '%'))) AND " +
           "(:minPrice IS NULL OR a.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR a.price <= :maxPrice) order by a.postingDate desc")
    Page<Advertisement> searchAdvertisements(
            @Param("category") Category category,
            @Param("title") String title,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);
}
