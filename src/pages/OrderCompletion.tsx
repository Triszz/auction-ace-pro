import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, MessageSquare, Star, ThumbsUp, ThumbsDown } from "lucide-react";

export default function OrderCompletion() {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState<1 | -1 | null>(null);
  const [messages, setMessages] = useState([
    { id: 1, from: "seller", text: "Xin chào, vui lòng thanh toán trong 24h", time: "10:30" },
    { id: 2, from: "buyer", text: "Vâng, tôi sẽ chuyển khoản ngay", time: "10:35" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const product = {
    id: id,
    title: "iPhone 15 Pro Max 256GB Titan Xanh",
    image: "https://images.unsplash.com/photo-1592286927505-c0d4732a2b9d",
    finalPrice: 28500000,
    seller: "Nguyễn Văn A",
    buyer: "Trần Thị B",
  };

  const steps = [
    { number: 1, title: "Thanh toán", icon: Package },
    { number: 2, title: "Gửi hàng", icon: Package },
    { number: 3, title: "Nhận hàng", icon: CheckCircle },
    { number: 4, title: "Đánh giá", icon: Star },
  ];

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        from: "buyer", 
        text: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      }]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Hoàn tất đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Người bán</p>
                        <p className="font-medium">{product.seller}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Người mua</p>
                        <p className="font-medium">{product.buyer}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-muted-foreground text-sm">Giá thắng đấu giá</p>
                      <p className="text-2xl font-bold text-primary">
                        {product.finalPrice.toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Tiến trình giao dịch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  {steps.map((s, index) => (
                    <div key={s.number} className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        step >= s.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        <s.icon className="h-6 w-6" />
                      </div>
                      <p className="text-sm font-medium text-center">{s.title}</p>
                      {index < steps.length - 1 && (
                        <div className={`h-1 w-full mt-2 ${
                          step > s.number ? "bg-primary" : "bg-muted"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step Content */}
            <Card>
              <CardHeader>
                <CardTitle>Bước {step}: {steps[step - 1].title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label>Địa chỉ giao hàng</Label>
                      <Textarea placeholder="Nhập địa chỉ giao hàng..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Hình ảnh hóa đơn thanh toán</Label>
                      <Input type="file" accept="image/*" />
                    </div>
                    <Button onClick={() => setStep(2)}>Xác nhận thanh toán</Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label>Mã vận đơn</Label>
                      <Input placeholder="Nhập mã vận đơn..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Hình ảnh đơn vận chuyển</Label>
                      <Input type="file" accept="image/*" />
                    </div>
                    <Button onClick={() => setStep(3)}>Xác nhận đã gửi hàng</Button>
                  </>
                )}

                {step === 3 && (
                  <>
                    <p className="text-muted-foreground">
                      Đang chờ người mua xác nhận đã nhận hàng
                    </p>
                    <Button onClick={() => setStep(4)}>Xác nhận đã nhận hàng</Button>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className="space-y-2">
                      <Label>Đánh giá</Label>
                      <div className="flex gap-4">
                        <Button
                          variant={rating === 1 ? "default" : "outline"}
                          onClick={() => setRating(1)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Tích cực (+1)
                        </Button>
                        <Button
                          variant={rating === -1 ? "destructive" : "outline"}
                          onClick={() => setRating(-1)}
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          Tiêu cực (-1)
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Nhận xét</Label>
                      <Textarea placeholder="Viết nhận xét của bạn..." />
                    </div>
                    <Button>Gửi đánh giá</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <CardTitle>Trò chuyện</CardTitle>
                </div>
                <CardDescription>Trao đổi với đối tác</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.from === "buyer" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        msg.from === "buyer" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                  />
                  <Button type="submit">Gửi</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
