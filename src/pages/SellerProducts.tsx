import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Ban } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SellerProducts() {
  // Mock seller products
  const sellerProducts = mockProducts.slice(0, 6);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof mockProducts[0] | null>(null);

  const handleCancelTransaction = (product: typeof mockProducts[0]) => {
    setSelectedProduct(product);
    setCancelDialogOpen(true);
  };

  const confirmCancelTransaction = () => {
    if (selectedProduct) {
      toast.success("Giao dịch đã bị huỷ", {
        description: `Người thắng đấu giá (${selectedProduct.highestBidder}) đã nhận -1 điểm đánh giá. Nhận xét: "Người thắng không thanh toán khi đã quá thời hạn thanh toán"`,
        duration: 5000,
      });
      setCancelDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // Check if auction has ended
  const isAuctionEnded = (endTime: Date) => {
    return endTime.getTime() < Date.now();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Quản lý sản phẩm</h1>
                    <p className="text-muted-foreground">Danh sách sản phẩm của bạn</p>
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
                        <div className="flex gap-2">
                          <Badge variant="secondary">{product.category}</Badge>
                          {isAuctionEnded(product.endTime) && (
                            <Badge variant="outline" className="bg-muted">Đã kết thúc</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Xem
                        </Button>
                        {!isAuctionEnded(product.endTime) && (
                          <>
                            <Link to={`/seller/products/${product.id}/edit-description`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Sửa mô tả
                              </Button>
                            </Link>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {isAuctionEnded(product.endTime) && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleCancelTransaction(product)}
                          >
                            <Ban className="h-4 w-4 mr-1" />
                            Huỷ giao dịch
                          </Button>
                        )}
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
                        <p className="text-sm text-muted-foreground">
                          {isAuctionEnded(product.endTime) ? "Trạng thái" : "Thời gian còn lại"}
                        </p>
                        <p className="text-lg font-semibold">
                          {isAuctionEnded(product.endTime) 
                            ? "Đã kết thúc" 
                            : `${Math.floor((product.endTime.getTime() - Date.now()) / (1000 * 60 * 60))}h`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận huỷ giao dịch</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn huỷ giao dịch cho sản phẩm "{selectedProduct?.title}"?
                <br /><br />
                Hành động này sẽ:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Tự động trừ 1 điểm đánh giá (-1) cho người thắng đấu giá</li>
                  <li>Ghi nhận xét: "Người thắng không thanh toán khi đã quá thời hạn thanh toán"</li>
                  <li>Không thể hoàn tác</li>
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCancelTransaction}>
                Xác nhận huỷ giao dịch
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
