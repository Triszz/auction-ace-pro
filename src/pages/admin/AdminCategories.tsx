import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Điện tử", parent: null, productCount: 45 },
    { id: 2, name: "Điện thoại di động", parent: "Điện tử", productCount: 20 },
    { id: 3, name: "Máy tính xách tay", parent: "Điện tử", productCount: 15 },
    { id: 4, name: "Thời trang", parent: null, productCount: 38 },
    { id: 5, name: "Giày", parent: "Thời trang", productCount: 18 },
    { id: 6, name: "Đồng hồ", parent: "Thời trang", productCount: 12 },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý danh mục</h1>
            <p className="text-muted-foreground">Quản lý danh mục sản phẩm đấu giá</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Thêm danh mục
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm danh mục mới</DialogTitle>
                <DialogDescription>Tạo danh mục sản phẩm mới</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Tên danh mục</Label>
                  <Input id="category-name" placeholder="Ví dụ: Điện tử" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parent-category">Danh mục cha (Tùy chọn)</Label>
                  <Input id="parent-category" placeholder="Để trống nếu là danh mục gốc" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Thêm danh mục</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Danh sách danh mục</CardTitle>
            <CardDescription>Tổng cộng {categories.length} danh mục</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead>Danh mục cha</TableHead>
                  <TableHead>Số sản phẩm</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.parent || "-"}</TableCell>
                    <TableCell>{category.productCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          disabled={category.productCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
