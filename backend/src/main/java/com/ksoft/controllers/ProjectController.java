package com.ksoft.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.ksoft.services.ProductService;
import lombok.AllArgsConstructor;
import com.ksoft.dto.ProductDTO;

@RestController
@RequestMapping("/api/products")
@AllArgsConstructor
public class ProjectController {

    private final ProductService productService;

    @GetMapping
    @ResponseBody
    public List<ProductDTO> products() {
        return this.productService.getAllProducts();
    }

    @PostMapping
    @ResponseBody
    public ProductDTO recordProduct(@RequestBody ProductDTO productDTO) {
        return this.productService.saveProduct(productDTO);
    }
}
