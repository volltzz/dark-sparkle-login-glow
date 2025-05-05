
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter, Download, Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
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

// Sample users data - in a real app this would come from an API
const usersData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2025-05-01' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Manager', status: 'Active', lastActive: '2025-05-01' },
  { id: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'User', status: 'Inactive', lastActive: '2025-04-28' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastActive: '2025-04-30' },
  { id: '5', name: 'David Wilson', email: 'david@example.com', role: 'Manager', status: 'Active', lastActive: '2025-05-01' },
  { id: '6', name: 'Lisa Thompson', email: 'lisa@example.com', role: 'User', status: 'Suspended', lastActive: '2025-04-25' },
  { id: '7', name: 'Kevin Martin', email: 'kevin@example.com', role: 'User', status: 'Active', lastActive: '2025-04-29' },
  { id: '8', name: 'Jessica White', email: 'jessica@example.com', role: 'User', status: 'Inactive', lastActive: '2025-04-27' },
  { id: '9', name: 'Robert Taylor', email: 'robert@example.com', role: 'Manager', status: 'Active', lastActive: '2025-04-30' },
  { id: '10', name: 'Amanda Garcia', email: 'amanda@example.com', role: 'User', status: 'Active', lastActive: '2025-05-01' },
  { id: '11', name: 'Thomas Robinson', email: 'thomas@example.com', role: 'User', status: 'Active', lastActive: '2025-04-29' },
  { id: '12', name: 'Jennifer Lewis', email: 'jennifer@example.com', role: 'User', status: 'Suspended', lastActive: '2025-04-26' },
];

// Define a type for our user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
}

// Interface for editing state
interface EditingState {
  id: string | null;
  field: 'name' | 'email' | null;
  value: string;
}

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(usersData);
  const itemsPerPage = 5;
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // State for inline editing
  const [editing, setEditing] = useState<EditingState>({
    id: null,
    field: null,
    value: ''
  });
  
  // New user form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active'
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handle role/status select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your API
    console.log('New user data:', newUser);
    
    // Show success toast
    toast({
      title: "User created",
      description: `${newUser.name} has been added successfully.`,
    });
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: 'User',
      status: 'Active'
    });
  };

  // Handle starting to edit a field
  const startEdit = (user: User, field: 'name' | 'email') => {
    setEditing({
      id: user.id,
      field: field,
      value: user[field]
    });
  };

  // Handle input change during inline editing
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditing(prev => ({
      ...prev,
      value: e.target.value
    }));
  };

  // Save the edited value
  const saveEdit = () => {
    if (editing.id && editing.field) {
      const updatedUsers = users.map(user => {
        if (user.id === editing.id) {
          return {
            ...user,
            [editing.field as string]: editing.value
          };
        }
        return user;
      });
      
      setUsers(updatedUsers);
      
      // Show success toast
      toast({
        title: "Update successful",
        description: `User ${editing.field} has been updated.`,
      });
      
      // Reset editing state
      setEditing({
        id: null,
        field: null,
        value: ''
      });
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditing({
      id: null,
      field: null,
      value: ''
    });
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render editable cell or input field based on editing state
  const renderEditableCell = (user: User, field: 'name' | 'email') => {
    const isEditing = editing.id === user.id && editing.field === field;
    
    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <Input
            value={editing.value}
            onChange={handleEditChange}
            className="h-8 py-1"
            autoFocus
          />
          <div className="flex gap-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={saveEdit}
            >
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-6 w-6" 
              onClick={cancelEdit}
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="cursor-pointer hover:text-primary transition-colors"
        onClick={() => startEdit(user, field)}
      >
        {user[field]}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-1">Users</h1>
          <p className="text-muted-foreground">Manage your users and their access permissions.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all">
              <UserPlus size={18} className="mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md glass-morphism border-white/10">
            <DialogHeader>
              <DialogTitle className="text-gradient">Add New User</DialogTitle>
              <DialogDescription>
                Enter the details of the new user below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="bg-black/20 border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      name="role"
                      value={newUser.role}
                      onChange={(e) => handleSelectChange('role', e.target.value)}
                      className="h-10 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      name="status"
                      value={newUser.status}
                      onChange={(e) => handleSelectChange('status', e.target.value)}
                      className="h-10 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
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
                  Add User
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
              placeholder="Search users..."
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
            <div className={isMobile ? "min-w-[600px]" : ""}>
              <Table>
                <TableHeader className="bg-black/30">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-white/5">
                        <TableCell className="font-medium">
                          {renderEditableCell(user, 'name')}
                        </TableCell>
                        <TableCell>
                          {renderEditableCell(user, 'email')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.role === 'Admin' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                            user.role === 'Manager' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                            'bg-gray-500/20 text-gray-300 border-gray-500/30'
                          }>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            user.status === 'Active' ? 'default' :
                            user.status === 'Inactive' ? 'secondary' :
                            'destructive'
                          } className={
                            user.status === 'Active' ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' :
                            user.status === 'Inactive' ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' :
                            'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                          }>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        No users found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
        
        {filteredUsers.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div>
                Showing <span className="font-medium text-foreground">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{filteredUsers.length}</span> users
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

export default Users;
