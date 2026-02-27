package com.ksoft.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ksoft.component.Mapper;
import com.ksoft.dto.ProductDTO;
import com.ksoft.repository.ProductRepository;
import com.ksoft.entity.Product;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final Mapper mapper;

    public ProductService(ProductRepository productRepository, Mapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
            .stream()
            .map(mapper::toProductDTO)
            .collect(Collectors.toList());
    }

    public ProductDTO saveProduct(ProductDTO p) {
        Product product = this.mapper.toProduct(p);
        return this.mapper.toProductDTO(productRepository.save(product));
    }
}
