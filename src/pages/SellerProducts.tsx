import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

export default function SellerProducts() {
  // Mock seller products
  const sellerProducts = mockProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Quản lý sản phẩm</h1>
            <p className="text-muted-foreground">Danh sách sản phẩm đang đấu giá của bạn</p>
          </div>
          <Link to="/seller/create-product">
            <Button size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Đăng sản phẩm mới
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {sellerProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                        <Link to={`/seller/products/${product.id}/edit-description`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Sửa mô tả
                          </Button>
                        </Link>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Giá hiện tại</p>
                        <p className="text-lg font-bold text-primary">
                          {product.currentPrice.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Số lượt đấu giá</p>
                        <p className="text-lg font-semibold">{product.bidCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Người đấu giá cao nhất</p>
                        <p className="text-lg font-semibold">{product.highestBidder}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Thời gian còn lại</p>
                        <p className="text-lg font-semibold">
                          {Math.floor((product.endTime.getTime() - Date.now()) / (1000 * 60 * 60))}h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
