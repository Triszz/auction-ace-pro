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
import { Star, ThumbsUp, ThumbsDown, Package, Heart, Gavel, Award } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  
  // Mock user data
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    rating: 4.5,
    totalReviews: 24,
    positiveReviews: 22,
    role: "bidder", // bidder or seller
  };

  const reviews = [
    { id: 1, from: "Người bán XYZ", rating: 1, comment: "Người mua thanh toán đúng hạn, rất tốt!", date: "2025-11-15" },
    { id: 2, from: "Người bán ABC", rating: 1, comment: "Giao dịch suôn sẻ", date: "2025-11-10" },
    { id: 3, from: "Người bán DEF", rating: -1, comment: "Không phản hồi", date: "2025-11-05" },
  ];

  const watchList = mockProducts.slice(0, 4);
  const biddingProducts = mockProducts.slice(4, 8);
  const wonProducts = mockProducts.slice(8, 12);

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
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="watchlist">Yêu thích</TabsTrigger>
                <TabsTrigger value="bidding">Đang đấu giá</TabsTrigger>
                <TabsTrigger value="won">Đã thắng</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
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
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
