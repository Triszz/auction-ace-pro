import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, DollarSign, Sparkles } from "lucide-react";
import { mockProducts } from "@/lib/mockData";

const Index = () => {
  // Sort products for different sections
  const endingSoon = [...mockProducts]
    .sort((a, b) => a.endTime.getTime() - b.endTime.getTime())
    .slice(0, 5);

  const mostBids = [...mockProducts]
    .sort((a, b) => b.bidCount - a.bidCount)
    .slice(0, 5);

  const highestPrice = [...mockProducts]
    .sort((a, b) => b.currentPrice - a.currentPrice)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="border-b bg-gradient-auction py-16 text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Sàn đấu giá trực tuyến uy tín #1 Việt Nam
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Đấu Giá & Sở Hữu
              <br />
              <span className="text-accent">Sản Phẩm Mơ Ước</span>
            </h1>
            <p className="text-lg text-white/90">
              Khám phá hàng ngàn sản phẩm chính hãng được đấu giá mỗi ngày.
              Từ công nghệ, thời trang đến đồ sưu tầm độc đáo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Khám phá ngay
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Cách thức hoạt động
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-12 space-y-16">
        {/* Ending Soon Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Clock className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Sắp Kết Thúc</h2>
                <p className="text-sm text-muted-foreground">
                  Nhanh tay đặt giá trước khi hết thời gian!
                </p>
              </div>
            </div>
            <Button variant="ghost">Xem tất cả →</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {endingSoon.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Most Bids Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Nhiều Lượt Đấu Giá Nhất</h2>
                <p className="text-sm text-muted-foreground">
                  Các sản phẩm được quan tâm nhất hiện nay
                </p>
              </div>
            </div>
            <Button variant="ghost">Xem tất cả →</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {mostBids.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* Highest Price Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <DollarSign className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Giá Cao Nhất</h2>
                <p className="text-sm text-muted-foreground">
                  Những sản phẩm cao cấp và giá trị nhất
                </p>
              </div>
            </div>
            <Button variant="ghost">Xem tất cả →</Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {highestPrice.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="rounded-2xl bg-gradient-auction p-12 text-center text-white">
          <div className="mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-bold">Sẵn sàng bắt đầu đấu giá?</h2>
            <p className="text-lg text-white/90">
              Đăng ký ngay hôm nay và nhận ưu đãi đặc biệt cho người dùng mới
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Đăng ký miễn phí
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold">Về AuctionHub</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Giới thiệu</li>
                <li>Liên hệ</li>
                <li>Tuyển dụng</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Trung tâm trợ giúp</li>
                <li>Điều khoản sử dụng</li>
                <li>Chính sách bảo mật</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Danh mục</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Điện tử</li>
                <li>Thời trang</li>
                <li>Gia dụng</li>
                <li>Sưu tầm</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-bold">Kết nối</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2025 AuctionHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
