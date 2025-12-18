package com.cmjd96.shoppingApp.controller;

import com.cmjd96.shoppingApp.model.Product;
import com.cmjd96.shoppingApp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/product")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // IMAGE UPLOAD
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file) throws IOException {

        if (!file.getContentType().startsWith("image/")) {
            return ResponseEntity.badRequest().body("Only image files allowed");
        }
        String uploadDir = "uploads/products/";
        Files.createDirectories(Paths.get(uploadDir));

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // store ONLY this in DB
        return ResponseEntity.ok("products/" + fileName);
    }

    // IMAGE SERVE
    @GetMapping("/images/**")
    public ResponseEntity<Resource> getImage(HttpServletRequest request)
            throws MalformedURLException {

        String pathAfterImages =
                request.getRequestURI().split("/images/")[1];

        Path path = Paths.get("uploads").resolve(pathAfterImages);
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType;
        try {
            contentType = Files.probeContentType(path);
        } catch (IOException e) {
            contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }


    @PostMapping("/addProducts/{categoryId}")
    public ResponseEntity<Product> createProduct(@RequestBody Product product, @PathVariable long categoryId){
        return new ResponseEntity<Product>(productService.createProduct(product,categoryId), HttpStatus.CREATED);
    }

    @RequestMapping("/getAll")
    public List<Product> viewAllProduct(){
        return productService.viewAll();
    }

    @RequestMapping("/getProduct/{id}")
    public Product viewProductById(@PathVariable long id){
        return productService.viewProductById(id);
    }

    @DeleteMapping("delete/{id}")
    public void  deleteProduct(@PathVariable long id){
        productService.deleteProduct(id);
    }

    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable long id,@RequestBody Product newProduct){
        return productService.updateProduct(id,newProduct);
    }

    //Find product by Category wise
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> getProductByCategory(@PathVariable long categoryId){
        List<Product> list = this.productService.findByProductCategory(categoryId);
        return new ResponseEntity<List<Product>>(list,HttpStatus.ACCEPTED);
    }

    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productService.getFeaturedProducts();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam("query") String query){
        return ResponseEntity.ok(productService.searchProducts(query));
    }

}
