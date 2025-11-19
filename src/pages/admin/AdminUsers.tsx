import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "nguyenvana@example.com", role: "bidder", rating: 4.5, status: "active" },
    { id: 2, name: "Trần Thị B", email: "tranthib@example.com", role: "seller", rating: 4.8, status: "active" },
    { id: 3, name: "Lê Văn C", email: "levanc@example.com", role: "bidder", rating: 3.2, status: "blocked" },
  ];

  const upgradeRequests = [
    { id: 1, name: "Phạm Văn D", email: "phamvand@example.com", requestDate: "2025-11-18", rating: 4.6 },
    { id: 2, name: "Hoàng Thị E", email: "hoangthie@example.com", requestDate: "2025-11-17", rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Quản lý người dùng</h1>
          <p className="text-muted-foreground">Quản lý tài khoản người dùng và yêu cầu nâng cấp</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Danh sách người dùng</TabsTrigger>
            <TabsTrigger value="upgrade-requests">Yêu cầu nâng cấp</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách người dùng</CardTitle>
                <CardDescription>Tổng cộng {users.length} người dùng</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Vai trò</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "seller" ? "default" : "secondary"}>
                            {user.role === "seller" ? "Người bán" : "Người mua"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.rating}/5.0</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "destructive"}>
                            {user.status === "active" ? "Hoạt động" : "Bị chặn"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upgrade-requests">
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu nâng cấp Seller</CardTitle>
                <CardDescription>
                  Danh sách bidder xin nâng cấp tài khoản thành seller
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ngày yêu cầu</TableHead>
                      <TableHead>Đánh giá</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upgradeRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell className="font-medium">{request.name}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>{request.rating}/5.0</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="default" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Chấp nhận
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
