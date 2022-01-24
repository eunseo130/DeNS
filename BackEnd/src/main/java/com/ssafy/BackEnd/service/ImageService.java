package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.dto.ImageDto;
import com.ssafy.BackEnd.entity.Image;
import com.ssafy.BackEnd.repository.ImageRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class ImageService {

    private ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Transactional
    public Long saveImage(ImageDto imageDto) {
        return imageRepository.save(imageDto.toEntity()).getImage_id();
    }

    @Transactional
    public ImageDto getImage(Long image_id) {
        Image image = imageRepository.findById(image_id).get();

        ImageDto imageDto = ImageDto.builder()
                .image_id(image_id)
                .orig_image_name(image.getOrig_image_name())
                .image_name(image.getImage_name())
                .savefolder(image.getSavefolder())
                .build();
        return imageDto;
    }
}
