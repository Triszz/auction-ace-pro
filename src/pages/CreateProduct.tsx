import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, X } from "lucide-react";

export default function CreateProduct() {
  const [images, setImages] = useState<string[]>([]);
  const [autoExtend, setAutoExtend] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // TODO: Upload images to storage
      const newImages = Array.from(files).map(() => "https://images.unsplash.com/photo-1505740420928-5e560c06d30e");
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit product data to backend
    console.log("Submit product");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Đăng sản phẩm đấu giá</CardTitle>
            <CardDescription>
              Điền đầy đủ thông tin sản phẩm để bắt đầu đấu giá
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tên sản phẩm *</Label>
                <Input id="title" placeholder="Ví dụ: iPhone 15 Pro Max 256GB" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Danh mục *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dien-tu">Điện tử</SelectItem>
                    <SelectItem value="thoi-trang">Thời trang</SelectItem>
                    <SelectItem value="gia-dung">Gia dụng</SelectItem>
                    <SelectItem value="suu-tam">Sưu tầm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hình ảnh sản phẩm * (Tối thiểu 3 ảnh)</Label>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                      <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {images.length < 10 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Tải ảnh lên</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                {images.length < 3 && (
                  <p className="text-sm text-destructive">Vui lòng tải lên ít nhất 3 ảnh</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startPrice">Giá khởi điểm (₫) *</Label>
                  <Input id="startPrice" type="number" placeholder="1000000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceStep">Bước giá (₫) *</Label>
                  <Input id="priceStep" type="number" placeholder="100000" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buyNowPrice">Giá mua ngay (₫) (Tùy chọn)</Label>
                <Input id="buyNowPrice" type="number" placeholder="15000000" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Thời gian kết thúc *</Label>
                <Input id="endTime" type="datetime-local" required />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="autoExtend">Tự động gia hạn</Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động gia hạn thêm 10 phút khi có người đấu giá trong 5 phút cuối
                  </p>
                </div>
                <Switch
                  id="autoExtend"
                  checked={autoExtend}
                  onCheckedChange={setAutoExtend}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả sản phẩm *</Label>
                <Textarea
                  id="description"
                  placeholder="Mô tả chi tiết về sản phẩm..."
                  rows={10}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Hỗ trợ định dạng Markdown
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  Đăng sản phẩm
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Xem trước
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
