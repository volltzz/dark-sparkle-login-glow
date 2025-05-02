
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter users based on search term
  const filteredUsers = usersData.filter(user => 
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-1">Users</h1>
        <p className="text-muted-foreground">Manage your users and their access permissions.</p>
      </div>
      
      <Card className="glass-morphism border-white/10 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">All Users</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={
                        user.status === 'Active' ? 'default' :
                        user.status === 'Inactive' ? 'secondary' :
                        'destructive'
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{user.lastActive}</TableCell>
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
        
        {filteredUsers.length > 0 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className="cursor-pointer"
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
                    className="cursor-pointer"
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
