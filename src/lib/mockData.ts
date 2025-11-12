// Mock data for demo purposes
export const mockProducts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    title: "iPhone 14 Pro Max 256GB - Màu Tím Deep Purple",
    currentPrice: 25000000,
    buyNowPrice: 28000000,
    highestBidder: "****Khoa",
    bidCount: 23,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    isNew: false,
    category: "Điện thoại di động",
    description: `
      <h2>Mô tả sản phẩm</h2>
      <p>iPhone 14 Pro Max chính hãng VN/A, fullbox, còn bảo hành 10 tháng tại Apple Store.</p>
      <ul>
        <li>Màn hình: 6.7 inch, Super Retina XDR, Dynamic Island</li>
        <li>Chip: A16 Bionic</li>
        <li>Camera: 48MP Main, 12MP Ultra Wide, 12MP Telephoto</li>
        <li>Pin: 4323 mAh</li>
      </ul>
    `,
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      "https://images.unsplash.com/photo-1592286927505-2fd2e3f4f1e4?w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80",
      "https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=800&q=80",
    ],
    seller: {
      name: "Tuấn Anh Shop",
      rating: 95,
      totalRatings: 127,
    },
    startPrice: 20000000,
    stepPrice: 500000,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    autoExtend: true,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    title: "Đồng hồ Rolex Submariner Date - Vàng 18K",
    currentPrice: 450000000,
    buyNowPrice: 520000000,
    highestBidder: "****Minh",
    bidCount: 45,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isNew: false,
    category: "Đồng hồ",
    description: `
      <h2>Thông tin đồng hồ</h2>
      <p>Đồng hồ Rolex Submariner Date chính hãng, vàng 18K, fullbox, giấy tờ đầy đủ.</p>
      <ul>
        <li>Chất liệu: Vàng 18K</li>
        <li>Đường kính: 41mm</li>
        <li>Chống nước: 300m</li>
        <li>Máy: Automatic</li>
      </ul>
    `,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
    ],
    seller: {
      name: "Luxury Watch VN",
      rating: 98,
      totalRatings: 234,
    },
    startPrice: 400000000,
    stepPrice: 5000000,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    autoExtend: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
    title: "MacBook Pro 16 inch M2 Max 32GB RAM 1TB SSD",
    currentPrice: 65000000,
    buyNowPrice: 72000000,
    highestBidder: "****Hùng",
    bidCount: 18,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    isNew: true,
    category: "Máy tính xách tay",
    description: `
      <h2>Thông số kỹ thuật</h2>
      <p>MacBook Pro 16" M2 Max, mới 100%, seal nguyên, chưa active.</p>
      <ul>
        <li>Chip: Apple M2 Max (12-core CPU, 38-core GPU)</li>
        <li>RAM: 32GB Unified Memory</li>
        <li>SSD: 1TB</li>
        <li>Màn hình: 16.2 inch Liquid Retina XDR</li>
      </ul>
    `,
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    ],
    seller: {
      name: "Tech Store Hà Nội",
      rating: 92,
      totalRatings: 89,
    },
    startPrice: 60000000,
    stepPrice: 1000000,
    postedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    autoExtend: true,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    title: "Nike Air Jordan 1 Retro High OG - Chicago",
    currentPrice: 12000000,
    buyNowPrice: 15000000,
    highestBidder: "****Linh",
    bidCount: 31,
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    isNew: false,
    category: "Giày",
    description: `
      <h2>Chi tiết sản phẩm</h2>
      <p>Nike Air Jordan 1 Retro High OG Chicago, size 42, fullbox, còn mới 95%.</p>
      <ul>
        <li>Size: US 9 / EU 42</li>
        <li>Màu sắc: White/Varsity Red-Black</li>
        <li>Tình trạng: Like New (95%)</li>
        <li>Box: Còn nguyên</li>
      </ul>
    `,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80",
    ],
    seller: {
      name: "Sneaker Head VN",
      rating: 96,
      totalRatings: 156,
    },
    startPrice: 10000000,
    stepPrice: 300000,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    autoExtend: false,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
    title: "Canon EOS R5 Body + RF 24-70mm f/2.8L IS USM",
    currentPrice: 85000000,
    buyNowPrice: 95000000,
    highestBidder: "****Quân",
    bidCount: 12,
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    isNew: false,
    category: "Máy ảnh",
    description: `
      <h2>Thông tin máy ảnh</h2>
      <p>Canon EOS R5 kèm lens RF 24-70mm f/2.8L, máy đẹp, ít dùng, shutter count dưới 5000.</p>
      <ul>
        <li>Sensor: Full-frame 45MP CMOS</li>
        <li>Video: 8K RAW 29.97fps</li>
        <li>IBIS: 5-axis In-Body Image Stabilization</li>
        <li>Autofocus: Dual Pixel CMOS AF II</li>
      </ul>
    `,
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&q=80",
      "https://images.unsplash.com/photo-1606991784614-89d273f4c598?w=800&q=80",
      "https://images.unsplash.com/photo-1606992830879-44b1d5d4d3c3?w=800&q=80",
      "https://images.unsplash.com/photo-1606992830881-b4ae3d964e36?w=800&q=80",
    ],
    seller: {
      name: "Pro Camera Shop",
      rating: 94,
      totalRatings: 78,
    },
    startPrice: 80000000,
    stepPrice: 2000000,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    autoExtend: true,
  },
];

export const mockBidHistory = [
  {
    id: "1",
    bidder: "****Khoa",
    amount: 25000000,
    time: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "2",
    bidder: "****Minh",
    amount: 24500000,
    time: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "3",
    bidder: "****Hùng",
    amount: 24000000,
    time: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "4",
    bidder: "****Linh",
    amount: 23500000,
    time: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "5",
    bidder: "****Quân",
    amount: 23000000,
    time: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
];

export const mockQA = [
  {
    id: "1",
    question: "Máy còn bảo hành bao lâu ạ?",
    questioner: "****Tuấn",
    answer: "Máy còn bảo hành chính hãng Apple 10 tháng bạn nhé. Mình có thể cung cấp hóa đơn mua hàng.",
    askedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    answeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    question: "Máy có bị rơi vỡ hay sửa chữa gì không?",
    questioner: "****Khoa",
    answer: "Máy chưa từng sửa chữa, không có vết rơi vỡ. Máy còn mới 98% bạn nhé.",
    askedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    answeredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000),
  },
];
