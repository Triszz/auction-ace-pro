import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ProductCard } from "@/components/ProductCard";
import { Star, ThumbsUp, ThumbsDown, Package, Heart, Gavel, Award, Clock, XCircle } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | number | null>(null);
  const { toast } = useToast();
  
  // Mock user data
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    rating: 4.5,
    totalReviews: 24,
    positiveReviews: 22,
    role: "seller", // bidder or seller - Change to see seller tabs
  };

  const reviews = [
    { id: 1, from: "Người bán XYZ", rating: 1, comment: "Người mua thanh toán đúng hạn, rất tốt!", date: "2025-11-15" },
    { id: 2, from: "Người bán ABC", rating: 1, comment: "Giao dịch suôn sẻ", date: "2025-11-10" },
    { id: 3, from: "Người bán DEF", rating: -1, comment: "Không phản hồi", date: "2025-11-05" },
  ];

  const watchList = mockProducts.slice(0, 4);
  const biddingProducts = mockProducts.slice(4, 8);
  const wonProducts = mockProducts.slice(8, 12);
  const activeProducts = mockProducts.slice(0, 6);
  
  // Mock sold products with payment status
  const pendingPaymentProducts = mockProducts.slice(6, 8).map((product, index) => ({
    ...product,
    winnerId: index + 1,
    winnerName: `Người thắng ${index + 1}`,
    auctionEndDate: new Date(Date.now() - (index + 2) * 24 * 60 * 60 * 1000).toISOString(),
    paymentDeadline: new Date(Date.now() + (7 - (index + 2)) * 24 * 60 * 60 * 1000).toISOString(),
    paymentStatus: 'pending'
  }));
  
  const paidProducts = mockProducts.slice(8, 10).map((product, index) => ({
    ...product,
    winnerId: index + 10,
    winnerName: `Người thắng ${index + 10}`,
    auctionEndDate: new Date(Date.now() - (index + 10) * 24 * 60 * 60 * 1000).toISOString(),
    paymentDate: new Date(Date.now() - (index + 5) * 24 * 60 * 60 * 1000).toISOString(),
    paymentStatus: 'paid'
  }));

  const handleCancelTransaction = (productId: string | number) => {
    setSelectedProduct(productId);
    setCancelDialogOpen(true);
  };

  const confirmCancelTransaction = () => {
    // In real app, this would call API to cancel transaction and apply -1 rating
    toast({
      title: "Giao dịch đã bị hủy",
      description: "Người thắng đã nhận -1 điểm đánh giá",
    });
    setCancelDialogOpen(false);
    setSelectedProduct(null);
  };

  const isPaymentOverdue = (deadlineStr: string) => {
    return new Date(deadlineStr) < new Date();
  };

  const getDaysUntilDeadline = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-auction flex items-center justify-center text-4xl font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <CardTitle className="text-center">{user.name}</CardTitle>
                <CardDescription className="text-center">{user.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{user.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{user.totalReviews} đánh giá</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">{Math.round(user.positiveReviews / user.totalReviews * 100)}%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Tích cực</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    Yêu cầu nâng cấp Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className={`grid w-full ${user.role === "seller" ? "grid-cols-8" : "grid-cols-5"}`}>
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="watchlist">Yêu thích</TabsTrigger>
                <TabsTrigger value="bidding">Đang đấu giá</TabsTrigger>
                <TabsTrigger value="won">Đã thắng</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                {user.role === "seller" && (
                  <>
                    <TabsTrigger value="selling">Đang bán</TabsTrigger>
                    <TabsTrigger value="pending-payment">Chờ thanh toán</TabsTrigger>
                    <TabsTrigger value="sold">Đã bán</TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="info">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin tài khoản của bạn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Họ và tên</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Textarea id="address" defaultValue={user.address} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Mật khẩu mới</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <Button>Cập nhật thông tin</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="watchlist">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      <CardTitle>Danh sách yêu thích</CardTitle>
                    </div>
                    <CardDescription>Các sản phẩm bạn đang theo dõi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {watchList.map(product => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bidding">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Gavel className="h-5 w-5" />
                      <CardTitle>Đang tham gia đấu giá</CardTitle>
                    </div>
                    <CardDescription>Các sản phẩm bạn đang đặt giá</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {biddingProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="won">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      <CardTitle>Đấu giá thắng</CardTitle>
                    </div>
                    <CardDescription>Các sản phẩm bạn đã thắng đấu giá</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wonProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      <CardTitle>Đánh giá từ người dùng</CardTitle>
                    </div>
                    <CardDescription>Lịch sử đánh giá của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold">{review.from}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <Badge variant={review.rating > 0 ? "default" : "destructive"}>
                              {review.rating > 0 ? (
                                <><ThumbsUp className="h-3 w-3 mr-1" />+1</>
                              ) : (
                                <><ThumbsDown className="h-3 w-3 mr-1" />-1</>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {user.role === "seller" && (
                <>
                  <TabsContent value="selling">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          <CardTitle>Sản phẩm đang bán</CardTitle>
                        </div>
                        <CardDescription>Các sản phẩm đang trong phiên đấu giá</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activeProducts.map(product => (
                            <ProductCard key={product.id} {...product} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pending-payment">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <CardTitle>Chờ thanh toán</CardTitle>
                        </div>
                        <CardDescription>Sản phẩm đã thắng nhưng chưa thanh toán (hạn mặc định: 1 tuần)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pendingPaymentProducts.map(product => (
                            <div key={product.id} className="border rounded-lg p-4">
                              <div className="flex gap-4">
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">{product.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Người thắng: <span className="font-medium">{product.winnerName}</span>
                                  </p>
                                  <p className="text-sm mb-2">
                                    Giá thắng: <span className="font-bold text-primary">{product.currentPrice.toLocaleString('vi-VN')} ₫</span>
                                  </p>
                                  <div className="flex items-center gap-2">
                                    {isPaymentOverdue(product.paymentDeadline) ? (
                                      <Badge variant="destructive" className="flex items-center gap-1">
                                        <XCircle className="h-3 w-3" />
                                        Quá hạn thanh toán
                                      </Badge>
                                    ) : (
                                      <Badge variant="secondary" className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        Còn {getDaysUntilDeadline(product.paymentDeadline)} ngày
                                      </Badge>
                                    )}
                                    <span className="text-xs text-muted-foreground">
                                      Hạn: {new Date(product.paymentDeadline).toLocaleDateString('vi-VN')}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                  {isPaymentOverdue(product.paymentDeadline) && (
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      onClick={() => handleCancelTransaction(product.id)}
                                    >
                                      Hủy giao dịch
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          {pendingPaymentProducts.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">
                              Không có sản phẩm nào đang chờ thanh toán
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="sold">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          <CardTitle>Sản phẩm đã bán</CardTitle>
                        </div>
                        <CardDescription>Các sản phẩm đã hoàn tất thanh toán</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {paidProducts.map(product => (
                            <div key={product.id} className="border rounded-lg p-4">
                              <div className="flex gap-4">
                                <img 
                                  src={product.image} 
                                  alt={product.title}
                                  className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-1">{product.title}</h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    Người mua: <span className="font-medium">{product.winnerName}</span>
                                  </p>
                                  <p className="text-sm mb-2">
                                    Giá bán: <span className="font-bold text-primary">{product.currentPrice.toLocaleString('vi-VN')} ₫</span>
                                  </p>
                                  <Badge variant="default" className="flex items-center gap-1 w-fit">
                                    <ThumbsUp className="h-3 w-3" />
                                    Đã thanh toán: {new Date(product.paymentDate).toLocaleDateString('vi-VN')}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                          {paidProducts.length === 0 && (
                            <p className="text-center text-muted-foreground py-8">
                              Chưa có sản phẩm nào được thanh toán
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </main>

      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận hủy giao dịch</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn hủy giao dịch này? Người thắng sẽ nhận -1 điểm đánh giá với nội dung: 
              "Người thắng không thanh toán khi đã quá thời hạn thanh toán".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelTransaction}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
