## Introduction
A Data Transfer Object (DTO) in Java is a simple object used to encapsulate data and transfer it between different layers or subsystems of an application, particularly over remote interfaces like web services.
A DTO is Java pattern that simplfies data sharing to reduce the number of system calls and network ovverhead by aggregating the data into a single object for transfer.

## Benefits
Key benefits include:
- Reduced Calls: Aggregating data into one object reduces the number of round-trip network calls between client and server, improving performance.
- Decoupling: DTOs act as a boundary, preventing tight coupling between the presentation (UI) layer and the domain or persistence (database entity) layers. This allows each layer to evolve independently.
- Security and Data Privacy: DTOs allow developers to select and expose only the necessary fields, keeping sensitive data (like passwords or financial details) hidden from the client side.
- Data Shaping: DTOs can be tailored to specific use cases (e.g., a UserRequestDTO for input might differ from a UserResponseDTO for output), simplifying data handling and validation.

## Typical example
In this project, we create a web service to record and retrieve products from a database.
A product is represented by this structure:

```
{
    id,
    name,
    description,
    price
}
```

The endpoint to save and retrieve data:

```
GET: /api/products
POST: /api/products
```

We will use maven:
- To build: _mvn clean package_ 
- To run on PORT 9025 (You can change to whatever you want but be sure it's not already used by another program): _mvn exec:java -Dexec.mainClass="com.ksoft.App" -Dserver.port=9025_

## Project structure and packages
- Class com.ksoft.controllers.ProjectController.java is the entry point of our api. This is made possible by the _@RestController_ annotation
```
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
```
- Service com.ksoft.services.ProjectService.java. We use the service to well ogranize our code. All the logics reside inside the service. This approach gives more flexibility and code is easy to maintain.
```
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
```