import { Search, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const categories = [
    {
      name: "Điện tử",
      subcategories: ["Điện thoại di động", "Máy tính xách tay", "Máy tính bảng", "Phụ kiện"],
    },
    {
      name: "Thời trang",
      subcategories: ["Giày", "Đồng hồ", "Túi xách", "Trang sức"],
    },
    {
      name: "Gia dụng",
      subcategories: ["Nội thất", "Đồ điện tử gia dụng", "Nhà bếp", "Trang trí"],
    },
    {
      name: "Sưu tầm",
      subcategories: ["Nghệ thuật", "Đồ cổ", "Tiền xu", "Tem"],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-auction">
              <span className="text-lg font-bold text-white">A</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-gradient-auction">
              AuctionHub
            </span>
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {categories.map((category) => (
                <NavigationMenuItem key={category.name}>
                  <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <NavigationMenuLink asChild>
                            <a
                              href={`/category/${sub}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{sub}</div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <form className="hidden w-full max-w-sm md:flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm đấu giá..."
              className="h-9"
            />
            <Button type="submit" size="sm" className="h-9">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Yêu thích</span>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <User className="h-4 w-4" />
                <span className="sr-only">Tài khoản</span>
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="hidden md:inline-flex">
                Đăng nhập
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
