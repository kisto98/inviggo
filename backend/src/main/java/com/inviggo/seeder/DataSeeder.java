package com.inviggo.seeder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.inviggo.model.Advertisement;
import com.inviggo.model.Category;
import com.inviggo.model.User;
import com.inviggo.repository.AdvertisementRepository;
import com.inviggo.repository.UserRepository;


@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdvertisementRepository adRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Seed users
        List<User> users = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            User user = new User();
            user.setUsername("user" + i);
            user.setPassword(passwordEncoder.encode("password" + i));
            user.setPhone("123456789" + i);
            user.setRegistrationDate(LocalDateTime.now());
            users.add(user);
        }
        userRepository.saveAll(users);
        
        // Seed advertisements
        List<Advertisement> ads = new ArrayList<>();
        String[] cities = {"Belgrade", "Novi Sad", "Nis", "Kragujevac"};
        Random random = new Random();
        
        for (int i = 1; i <= 100; i++) {
            Advertisement ad = new Advertisement();
            ad.setTitle("Ad " + i);
            ad.setDescription("Description for ad " + i);
            ad.setImageUrl("https://picsum.photos/200/300?random=" + i);
            ad.setPrice(random.nextDouble() * 1000);
            ad.setCategory(Category.values()[random.nextInt(Category.values().length)]);
            ad.setCity(cities[random.nextInt(cities.length)]);
            ad.setPostingDate(LocalDateTime.now().minusDays(random.nextInt(30)));
            ad.setUser(users.get(random.nextInt(users.size())));
            ads.add(ad);
        }
        adRepository.saveAll(ads);
    }
}