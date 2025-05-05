
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Plus, Edit, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample products data
const productsData = [
  { 
    id: '1', 
    name: 'Premium Wireless Headphones', 
    category: 'Electronics', 
    price: 199.99, 
    stock: 45,
    status: 'In Stock'
  },
  { 
    id: '2', 
    name: 'Ergonomic Office Chair', 
    category: 'Furniture', 
    price: 249.99, 
    stock: 18,
    status: 'In Stock'
  },
  { 
    id: '3', 
    name: 'Stainless Steel Water Bottle', 
    category: 'Kitchen', 
    price: 24.95, 
    stock: 86,
    status: 'In Stock'
  },
  { 
    id: '4', 
    name: 'Organic Cotton T-Shirt', 
    category: 'Clothing', 
    price: 29.99, 
    stock: 124,
    status: 'In Stock'
  },
  { 
    id: '5', 
    name: 'Smart Home Security Camera', 
    category: 'Electronics', 
    price: 149.99, 
    stock: 32,
    status: 'In Stock'
  },
  { 
    id: '6', 
    name: 'Bluetooth Portable Speaker', 
    category: 'Electronics', 
    price: 79.99, 
    stock: 0,
    status: 'Out of Stock'
  },
  { 
    id: '7', 
    name: 'Professional Knife Set', 
    category: 'Kitchen', 
    price: 199.95, 
    stock: 14,
    status: 'In Stock'
  },
  { 
    id: '8', 
    name: 'Leather Wallet', 
    category: 'Accessories', 
    price: 59.99, 
    stock: 67,
    status: 'In Stock'
  },
  { 
    id: '9', 
    name: 'Smartwatch', 
    category: 'Electronics', 
    price: 299.99, 
    stock: 8,
    status: 'Low Stock'
  },
  { 
    id: '10', 
    name: 'Yoga Mat', 
    category: 'Fitness', 
    price: 39.99, 
    stock: 54,
    status: 'In Stock'
  },
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(productsData);
  const itemsPerPage = 5;
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // New product form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock);

    if (isNaN(price) || isNaN(stock)) {
      toast({
        title: "Invalid input",
        description: "Price and stock must be valid numbers.",
        variant: "destructive"
      });
      return;
    }

    // Create new product
    const status = stock > 0 ? stock < 10 ? 'Low Stock' : 'In Stock' : 'Out of Stock';
    const newProductItem: Product = {
      id: (products.length + 1).toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: price,
      stock: stock,
      status: status
    };
    
    // Add product to list
    setProducts([...products, newProductItem]);
    
    // Show success toast
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added successfully.`,
    });
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: ''
    });
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    // Find the product to delete
    const productToDelete = products.find(product => product.id === id);
    
    if (productToDelete) {
      // Remove the product
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      // Show success toast
      toast({
        title: "Product deleted",
        description: `${productToDelete.name} has been removed.`,
      });
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-1">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and catalog.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all">
              <Plus size={18} className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md glass-morphism border-white/10">
            <DialogHeader>
              <DialogTitle className="text-gradient">Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details of the new product below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Premium Wireless Headphones"
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    placeholder="Electronics"
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      placeholder="199.99"
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      placeholder="45"
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-white/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Add Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="glass-morphism border-white/10 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="hover:bg-accent/50">
              <Filter size={18} />
            </Button>
            <Button variant="outline" size="icon" className="hover:bg-accent/50">
              <Download size={18} />
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <ScrollArea className="w-full">
            <div className={isMobile ? "min-w-[700px]" : ""}>
              <Table>
                <TableHeader className="bg-black/30">
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <TableRow key={product.id} className="hover:bg-white/5">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant={
                            product.status === 'In Stock' ? 'default' :
                            product.status === 'Low Stock' ? 'secondary' :
                            'destructive'
                          } className={
                            product.status === 'In Stock' ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' :
                            product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' :
                            'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                          }>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent/50">
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:bg-red-500/20 text-red-300"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No products found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
        
        {filteredProducts.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div>
                Showing <span className="font-medium text-foreground">{indexOfFirstProduct + 1}</span> to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(indexOfLastProduct, filteredProducts.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{filteredProducts.length}</span> products
              </div>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={`cursor-pointer ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 3) }).map((_, idx) => {
                  let pageNum: number;
                  
                  if (totalPages <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage <= 2) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 2 + idx;
                  } else {
                    pageNum = currentPage - 1 + idx;
                  }
                  
                  return (
                    <PaginationItem key={idx}>
                      <PaginationLink 
                        isActive={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={`cursor-pointer ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Products;
