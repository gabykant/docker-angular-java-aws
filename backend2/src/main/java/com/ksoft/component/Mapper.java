package com.ksoft.component;

import org.springframework.stereotype.Component;

import com.ksoft.dto.ProductDTO;
import com.ksoft.entity.Product;

@Component
public class Mapper {

    public ProductDTO toProductDTO(Product product) {
        return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice());
    }

    public Product toProduct(ProductDTO productDTO) {
        return Product.builder()
            .name(productDTO.getName())
            .description(productDTO.getDescription())
            .price(productDTO.getPrice())
            .build();
    }
}
