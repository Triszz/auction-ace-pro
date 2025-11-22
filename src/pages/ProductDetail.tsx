import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { CountdownTimer } from "@/components/CountdownTimer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Heart,
  Share2,
  TrendingUp,
  Star,
  Calendar,
  Package,
  MessageSquare,
  Gavel,
  ShoppingCart,
  Ban,
  Send,
} from "lucide-react";
import { mockProducts, mockBidHistory, mockQA } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
  const relatedProducts = mockProducts.filter((p) => p.id !== id).slice(0, 5);

  const [selectedImage, setSelectedImage] = useState(0);
  const [bidAmount, setBidAmount] = useState(product.currentPrice + product.stepPrice);
  const [question, setQuestion] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  // Mock user role - in real app, get from auth context
  const isSeller = true; // Change this based on actual user role
  
  const handleRejectBid = (bidderName: string) => {
    toast({
      title: "Đã từ chối lượt đấu giá",
      description: `Người dùng ${bidderName} đã bị từ chối đấu giá sản phẩm này`,
    });
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã gửi câu hỏi",
      description: "Người bán sẽ nhận được thông báo qua email",
    });
    setQuestion("");
  };

  const handleReplyQuestion = (questionId: string) => {
    toast({
      title: "Đã trả lời câu hỏi",
      description: "Người hỏi sẽ nhận được thông báo qua email",
    });
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute right-4 top-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <img src={image} alt={`${product.title} ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
            </div>

            <CountdownTimer endTime={product.endTime} />

            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Giá hiện tại</p>
                    <p className="text-4xl font-bold text-primary">
                      {product.currentPrice.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                  {product.buyNowPrice && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Mua ngay</p>
                      <p className="text-2xl font-bold text-accent">
                        {product.buyNowPrice.toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Số lượt đấu giá:</span>
                    <span className="font-semibold">{product.bidCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Đăng:</span>
                    <span className="font-semibold">
                      {formatDistanceToNow(product.postedAt, { addSuffix: true, locale: vi })}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {product.seller.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{product.seller.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent text-accent" />
                        <span>
                          {product.seller.rating}% ({product.seller.totalRatings} đánh giá)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Người đặt giá cao nhất: <span className="font-semibold">{product.highestBidder}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Bidding Section */}
            <Card className="border-primary">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Đặt giá của bạn</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      min={product.currentPrice + product.stepPrice}
                      step={product.stepPrice}
                      className="text-lg font-semibold"
                    />
                    <span className="flex items-center text-lg font-semibold">₫</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bước giá: {product.stepPrice.toLocaleString("vi-VN")}₫ | Giá đề nghị:{" "}
                    {(product.currentPrice + product.stepPrice).toLocaleString("vi-VN")}₫
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="lg" className="flex-1">
                    <Gavel className="mr-2 h-5 w-5" />
                    Đặt giá
                  </Button>
                  {product.buyNowPrice && (
                    <Button size="lg" variant="outline" className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Mua ngay
                    </Button>
                  )}
                </div>

                {product.autoExtend && (
                  <p className="text-xs text-muted-foreground text-center">
                    ⚡ Sản phẩm có tự động gia hạn 10 phút nếu có lượt đấu giá mới trước khi kết thúc 5 phút
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Mô tả sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </CardContent>
            </Card>

            {/* Q&A Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Câu hỏi & Trả lời
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockQA.map((qa) => (
                  <div key={qa.id} className="space-y-3">
                    <div className="rounded-lg bg-muted p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{qa.questioner[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{qa.questioner}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(qa.askedAt, { addSuffix: true, locale: vi })}
                          </p>
                          <p className="mt-2">{qa.question}</p>
                        </div>
                      </div>
                    </div>

                    {qa.answer ? (
                      <div className="ml-8 rounded-lg border bg-background p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {product.seller.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">{product.seller.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(qa.answeredAt!, { addSuffix: true, locale: vi })}
                            </p>
                            <p className="mt-2">{qa.answer}</p>
                          </div>
                        </div>
                      </div>
                    ) : isSeller && (
                      <div className="ml-8">
                        {replyingTo === qa.id ? (
                          <div className="space-y-2 rounded-lg border bg-background p-4">
                            <Label>Trả lời câu hỏi</Label>
                            <Textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Nhập câu trả lời..."
                              className="min-h-[80px]"
                            />
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleReplyQuestion(qa.id)}
                              >
                                <Send className="h-4 w-4 mr-1" />
                                Gửi
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setReplyingTo(null);
                                  setReplyText("");
                                }}
                              >
                                Hủy
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setReplyingTo(qa.id)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Trả lời
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {!isSeller && (
                  <>
                    <Separator />
                    <form onSubmit={handleSubmitQuestion} className="space-y-3">
                      <label className="text-sm font-medium">Đặt câu hỏi cho người bán</label>
                      <Textarea 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Nhập câu hỏi của bạn..." 
                        required
                      />
                      <Button type="submit">Gửi câu hỏi</Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Bid History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lịch sử đấu giá
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockBidHistory.map((bid, idx) => (
                    <div
                      key={bid.id}
                      className={`rounded-lg p-3 ${
                        idx === 0 ? "bg-primary/10 border border-primary" : "bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(bid.time, { addSuffix: true, locale: vi })}
                          </p>
                        </div>
                        <p className={`font-bold ${idx === 0 ? "text-primary" : ""}`}>
                          {bid.amount.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                      {isSeller && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="w-full">
                              <Ban className="h-4 w-4 mr-1" />
                              Từ chối
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận từ chối lượt đấu giá</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn từ chối lượt đấu giá của {bid.bidder}? 
                                Người này sẽ không được phép đấu giá sản phẩm này nữa.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRejectBid(bid.bidder)}>
                                Xác nhận
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Sản phẩm khác cùng chuyên mục</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
