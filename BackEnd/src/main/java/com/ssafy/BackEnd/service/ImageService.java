package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.ImageDto;
import com.ssafy.BackEnd.entity.Image;
import com.ssafy.BackEnd.entity.Profile;
import com.ssafy.BackEnd.repository.ImageRepository;
import com.ssafy.BackEnd.repository.ProfileRepository;
import com.ssafy.BackEnd.repository.UserRepository;
import io.lettuce.core.ScriptOutputType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    @Autowired
    private final ImageRepository imageRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final ProfileRepository profileRepository;

    @Value("${profileImg.path}")
    private String uploadFolder;

    public ImageService(ImageRepository imageRepository, UserRepository userRepository, ProfileRepository profileRepository) {
        this.imageRepository = imageRepository;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public void update(String email, MultipartFile multipartFile) {
        Profile profile = profileRepository.findByEmail(email);
        String imageFileName = profile.getProfile_id() + "_" + multipartFile.getOriginalFilename();
        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        if(multipartFile.getSize() != 0) {
            try {
                if (profile.getImage() != null) {
                    File file = new File(uploadFolder + profile.getImage());
                    file.delete();
                }
                Files.write(imageFilePath, multipartFile.getBytes());
            } catch (Exception e) {
                e.printStackTrace();
            }
            profile.setImage(imageFileName);
        }
    }
}
