import { Clock, TrendingUp, Heart, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  currentPrice: number;
  buyNowPrice?: number;
  highestBidder: string;
  bidCount: number;
  endTime: Date;
  isNew?: boolean;
  category: string;
}

export const ProductCard = ({
  id,
  image,
  title,
  currentPrice,
  buyNowPrice,
  highestBidder,
  bidCount,
  endTime,
  isNew,
  category,
}: ProductCardProps) => {
  const timeLeft = formatDistanceToNow(endTime, { addSuffix: true, locale: vi });
  const isEndingSoon = endTime.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000; // 3 days

  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-elevated">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              // Add to wishlist logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          {isNew && (
            <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground animate-pulse-slow">
              MỚI
            </Badge>
          )}
          {isEndingSoon && (
            <Badge className="absolute left-2 bottom-2 bg-destructive text-destructive-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Sắp kết thúc
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="mb-2 text-xs">
              {category}
            </Badge>
            <h3 className="line-clamp-2 font-semibold leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Giá hiện tại</p>
                <p className="text-xl font-bold text-primary">
                  {currentPrice.toLocaleString("vi-VN")}₫
                </p>
              </div>
              {buyNowPrice && (
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Mua ngay</p>
                  <p className="text-sm font-semibold text-accent">
                    {buyNowPrice.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{highestBidder}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{bidCount} lượt</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1 border-t">
              <Clock className="h-3 w-3" />
              <span>{timeLeft}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
