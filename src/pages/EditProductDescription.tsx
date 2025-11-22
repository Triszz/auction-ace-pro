import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function EditProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = mockProducts.find(p => p.id === id);
  
  const [additionalDescription, setAdditionalDescription] = useState("");

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Đã cập nhật mô tả",
      description: "Thông tin mô tả đã được thêm vào sản phẩm",
    });
    
    navigate("/seller/products");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/seller/products")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Bổ sung mô tả sản phẩm</CardTitle>
              <CardDescription>
                Thông tin mới sẽ được thêm vào cuối mô tả hiện tại (không thay thế)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Sản phẩm</Label>
                  <div className="flex gap-4 p-4 border rounded-lg bg-muted/50">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mô tả hiện tại</Label>
                  <div className="p-4 border rounded-lg bg-muted/50 max-h-60 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{product.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-description">Thông tin bổ sung *</Label>
                  <Textarea
                    id="additional-description"
                    value={additionalDescription}
                    onChange={(e) => setAdditionalDescription(e.target.value)}
                    placeholder="Nhập thông tin bổ sung cho sản phẩm..."
                    className="min-h-[200px]"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Thông tin này sẽ được thêm vào cuối mô tả hiện tại với dấu thời gian
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" size="lg">
                    Cập nhật mô tả
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/seller/products")}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
