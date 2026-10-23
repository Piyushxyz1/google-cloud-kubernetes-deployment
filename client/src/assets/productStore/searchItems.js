import NexoraGamingX1 from "../images/product-images/nexora-gaming-x1.png";
import NexoraProbook15 from "../images/product-images/nexora-probook-15.webp";
import NexoraUltrabookAir from "../images/product-images/nexora-ultrabook-air.jpg";
import NexoraCreatorPro16 from "../images/product-images/nexora-creator-pro-16.jpg";
import NexoraWorkMate14 from "../images/product-images/nexora-workmate-14.jpg";
import NexoraStudioDesktop from "../images/product-images/nexora-studio-desktop.jpg";
import NexoraProStation from "../images/product-images/nexora-prostation.webp";
import NexoraHomePC from "../images/product-images/nexora-home-pc.jpg";
import NexoraSoundMaxPro from "../images/product-images/nexora-soundmax-pro.webp";
import NexoraStudioHeadphone from "../images/product-images/nexora-studio-headphone.webp";
import NexoraAirSound from "../images/product-images/nexora-airsound.webp";
import NexoraBassElite from "../images/product-images/nexora-bass-elite.webp";
import NexoraKeyboardPro from "../images/product-images/nexora-keyboard-pro.png";
import NexoraPrecisionMouse from "../images/product-images/nexora-precision-mouse.png";
import NexoraGamingMouse from "../images/product-images/nexora-gaming-mouse.jpg";
import NexoraUsbChub from "../images/product-images/nexora-usb-c-hub.jpeg";
import LaptopStand from "../images/product-images/laptop-stand.webp";
export const products = [
  // =========================================================
  // LAPTOPS
  // =========================================================

  {
    id: 1,
    name: "Nexora Gaming X1",
    category: "Laptop",
    brand: "Nexora",

    price: 69999,
    originalPrice: 99999,
    discount: 10,
    onOffer: true,
    rating: 4.7,
    stock: 18,

    image: NexoraGamingX1,

    description:
      "Nexora Gaming X1 is built for gamers, developers and performance-focused users who demand powerful computing, responsive graphics and reliable performance for demanding workloads.",

    specifications: {
      Processor: "Intel Core i7",
      RAM: "16 GB DDR5",
      Storage: "1 TB NVMe SSD",
      Display: "15.6-inch FHD 144Hz",
      Graphics: "NVIDIA GeForce RTX",
      OperatingSystem: "Windows 11",
      Connectivity: "Wi-Fi 6, Bluetooth 5.3",
    },

    features: [
      "High-performance processor",
      "Dedicated NVIDIA graphics",
      "144Hz high-refresh display",
      "Fast NVMe SSD storage",
      "Advanced thermal management",
      "RGB gaming keyboard",
    ],

    highlights: [
      "Designed for high-performance gaming",
      "Fast and responsive computing",
      "Immersive high-refresh display",
      "Ideal for gaming and creative workloads",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Gaming X1", "Power Adapter", "User Manual"],
  },

  {
    id: 2,
    name: "Nexora ProBook 15",
    category: "Laptop",
    brand: "Nexora",

    price: 50999,
    originalPrice: 84999,
    discount: 12,
    onOffer: true,
    rating: 4.5,
    stock: 24,

    image: NexoraProbook15,

    description:
      "Nexora ProBook 15 combines dependable performance with a professional design, making it suitable for office work, development, productivity and everyday computing.",

    specifications: {
      Processor: "Intel Core i5",
      RAM: "16 GB DDR5",
      Storage: "512 GB NVMe SSD",
      Display: "15.6-inch FHD",
      Graphics: "Integrated Graphics",
      OperatingSystem: "Windows 11",
      Connectivity: "Wi-Fi 6, Bluetooth 5.2",
    },

    features: [
      "Professional performance",
      "Full HD display",
      "Fast SSD storage",
      "Comfortable keyboard",
      "Lightweight professional design",
    ],

    highlights: [
      "Built for productivity",
      "Reliable everyday performance",
      "Professional design",
      "Ideal for work and study",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora ProBook 15", "Power Adapter", "User Manual"],
  },

  {
    id: 3,
    name: "Nexora UltraBook Air",
    category: "Laptop",
    brand: "Nexora",

    price: 99999,
    rating: 4.8,
    stock: 12,

    image: NexoraUltrabookAir,

    description:
      "Nexora UltraBook Air delivers a premium balance of portability, performance and battery efficiency for professionals who work on the move.",

    specifications: {
      Processor: "Intel Core i7",
      RAM: "16 GB",
      Storage: "1 TB NVMe SSD",
      Display: "14-inch FHD",
      Graphics: "Integrated Graphics",
      OperatingSystem: "Windows 11",
      Battery: "Up to 12 Hours",
    },

    features: [
      "Slim and lightweight design",
      "High-performance processor",
      "Fast NVMe storage",
      "Long battery life",
      "Premium display",
    ],

    highlights: [
      "Designed for mobility",
      "Premium lightweight build",
      "Excellent productivity performance",
      "Long-lasting battery",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora UltraBook Air", "Power Adapter", "User Manual"],
  },

  {
    id: 4,
    name: "Nexora Creator Pro 16",
    category: "Laptop",
    brand: "Nexora",

    price: 59499,
    rating: 4.9,
    stock: 8,

    image: NexoraCreatorPro16,

    description:
      "Nexora Creator Pro 16 is designed for creators, developers and professionals who need powerful hardware for demanding creative and computing workloads.",

    specifications: {
      Processor: "Intel Core i9",
      RAM: "32 GB DDR5",
      Storage: "1 TB NVMe SSD",
      Display: "16-inch QHD",
      Graphics: "NVIDIA GeForce RTX",
      OperatingSystem: "Windows 11 Pro",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
    },

    features: [
      "High-end processor",
      "32 GB DDR5 memory",
      "Dedicated RTX graphics",
      "Large high-resolution display",
      "High-speed NVMe storage",
      "Professional-grade performance",
    ],

    highlights: [
      "Built for professional creators",
      "Powerful multitasking performance",
      "High-resolution visual experience",
      "Ideal for development and content creation",
    ],

    warranty: "2 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Creator Pro 16", "Power Adapter", "User Manual"],
  },

  {
    id: 5,
    name: "Nexora WorkMate 14",
    category: "Laptop",
    brand: "Nexora",

    price: 62999,
    rating: 4.3,
    stock: 31,

    image: NexoraWorkMate14,

    description:
      "Nexora WorkMate 14 is an everyday productivity laptop designed for professionals, students and users looking for dependable performance.",

    specifications: {
      Processor: "Intel Core i5",
      RAM: "8 GB",
      Storage: "512 GB SSD",
      Display: "14-inch FHD",
      Graphics: "Integrated Graphics",
      OperatingSystem: "Windows 11",
      Connectivity: "Wi-Fi 6, Bluetooth 5.2",
    },

    features: [
      "Compact 14-inch design",
      "Fast SSD storage",
      "Full HD display",
      "Reliable productivity performance",
      "Comfortable keyboard",
    ],

    highlights: [
      "Perfect for everyday productivity",
      "Compact and practical",
      "Fast startup and application loading",
      "Ideal for students and professionals",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora WorkMate 14", "Power Adapter", "User Manual"],
  },

  // =========================================================
  // DESKTOPS
  // =========================================================

  {
    id: 6,
    name: "Nexora Studio Desktop",
    category: "Desktop",
    brand: "Nexora",

    price: 70000,
    rating: 4.6,
    stock: 14,

    image: NexoraStudioDesktop,

    description:
      "Nexora Studio Desktop provides a powerful desktop computing experience for professionals, developers and creative users.",

    specifications: {
      Processor: "Intel Core i7",
      RAM: "16 GB DDR5",
      Storage: "1 TB NVMe SSD",
      Display: "27-inch FHD",
      Graphics: "Dedicated Graphics",
      OperatingSystem: "Windows 11",
      Connectivity: "Wi-Fi 6, Bluetooth 5.2",
    },

    features: [
      "Powerful desktop processor",
      "High-speed NVMe storage",
      "Large display",
      "Efficient cooling",
      "Designed for professional workloads",
    ],

    highlights: [
      "Powerful desktop performance",
      "Ideal for professional workflows",
      "Large immersive workspace",
      "Reliable everyday computing",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Studio Desktop", "Power Cable", "User Manual"],
  },

  {
    id: 7,
    name: "Nexora ProStation",
    category: "Desktop",
    brand: "Nexora",

    price: 49999,
    rating: 4.8,
    stock: 7,

    image:
     NexoraProStation,

    description:
      "Nexora ProStation is engineered for demanding professional workloads, development environments and advanced multitasking.",

    specifications: {
      Processor: "Intel Core i9",
      RAM: "32 GB DDR5",
      Storage: "2 TB NVMe SSD",
      Display: "27-inch QHD",
      Graphics: "NVIDIA GeForce RTX",
      OperatingSystem: "Windows 11 Pro",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
    },

    features: [
      "High-end desktop processor",
      "32 GB DDR5 memory",
      "Dedicated RTX graphics",
      "2 TB high-speed storage",
      "Advanced thermal management",
    ],

    highlights: [
      "Built for demanding workloads",
      "Professional workstation performance",
      "Excellent multitasking capability",
      "Large and immersive workspace",
    ],

    warranty: "2 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora ProStation", "Power Cable", "User Manual"],
  },

  {
    id: 8,
    name: "Nexora Home PC",
    category: "Desktop",
    brand: "Nexora",

    price: 58999,
    rating: 4.2,
    stock: 22,

    image:
      NexoraHomePC,

    description:
      "Nexora Home PC is designed for everyday home computing, education, browsing, entertainment and general productivity.",

    specifications: {
      Processor: "Intel Core i5",
      RAM: "8 GB",
      Storage: "512 GB SSD",
      Display: "23.8-inch FHD",
      Graphics: "Integrated Graphics",
      OperatingSystem: "Windows 11",
      Connectivity: "Wi-Fi 5, Bluetooth 5.0",
    },

    features: [
      "Compact desktop setup",
      "Full HD display",
      "Fast SSD storage",
      "Energy-efficient performance",
      "Easy everyday computing",
    ],

    highlights: [
      "Ideal for home users",
      "Simple and reliable setup",
      "Great for education and productivity",
      "Compact workspace solution",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Home PC", "Power Cable", "User Manual"],
  },

  // =========================================================
  // HEADPHONES
  // =========================================================

  {
    id: 9,
    name: "Nexora Studio Headphones",
    category: "Headphones",
    brand: "Nexora",

    price: 12999,
    rating: 4.6,
    stock: 35,

    image:
      NexoraStudioHeadphone,

    description:
      "Nexora Studio Headphones deliver balanced audio and immersive sound for music, entertainment, calls and professional listening.",

    specifications: {
      Connectivity: "Bluetooth 5.3",
      Battery: "40 Hours",
      Driver: "40mm Dynamic Driver",
      Microphone: "Built-in Microphone",
      NoiseCancellation: "Active Noise Cancellation",
      Charging: "USB-C",
    },

    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Bluetooth 5.3",
      "Comfortable over-ear design",
      "Built-in microphone",
    ],

    highlights: [
      "Studio-inspired sound",
      "All-day listening comfort",
      "Immersive audio experience",
      "Reliable wireless connectivity",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: [
      "Nexora Studio Headphones",
      "USB-C Charging Cable",
      "User Manual",
    ],
  },

  {
    id: 10,
    name: "Nexora SoundMax Pro",
    category: "Headphones",
    brand: "Nexora",

    price: 17999,
    rating: 4.8,
    stock: 19,

    image:
      NexoraSoundMaxPro,

    description:
      "Nexora SoundMax Pro is a premium wireless audio experience built for listeners who want powerful sound, comfort and advanced noise cancellation.",

    specifications: {
      Connectivity: "Bluetooth 5.3",
      Battery: "50 Hours",
      Driver: "45mm Dynamic Driver",
      Microphone: "Dual Microphone",
      NoiseCancellation: "Advanced ANC",
      Charging: "USB-C Fast Charging",
    },

    features: [
      "Advanced active noise cancellation",
      "50-hour battery life",
      "Premium dynamic drivers",
      "Fast USB-C charging",
      "Wireless connectivity",
    ],

    highlights: [
      "Premium audio performance",
      "Long-lasting battery",
      "Enhanced noise isolation",
      "Designed for travel and entertainment",
    ],

    warranty: "2 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: [
      "Nexora SoundMax Pro",
      "USB-C Charging Cable",
      "Carrying Case",
      "User Manual",
    ],
  },

  {
    id: 11,
    name: "Nexora AirSound",
    category: "Headphones",
    brand: "Nexora",

    price: 8999,
    rating: 4.3,
    stock: 42,

    image:
      NexoraAirSound,

    description:
      "Nexora AirSound offers a lightweight wireless listening experience with clear audio and comfortable everyday usability.",

    specifications: {
      Connectivity: "Bluetooth 5.2",
      Battery: "30 Hours",
      Driver: "40mm Driver",
      Microphone: "Built-in Microphone",
      NoiseCancellation: "Passive Noise Isolation",
      Charging: "USB-C",
    },

    features: [
      "Lightweight construction",
      "Wireless Bluetooth connectivity",
      "30-hour battery",
      "Clear audio reproduction",
      "Built-in microphone",
    ],

    highlights: [
      "Lightweight everyday headphones",
      "Comfortable for extended listening",
      "Reliable wireless performance",
      "Affordable premium audio",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora AirSound", "USB-C Cable", "User Manual"],
  },

  {
    id: 12,
    name: "Nexora Bass Elite",
    category: "Headphones",
    brand: "Nexora",

    price: 14999,
    rating: 4.5,
    stock: 27,

    image:
      NexoraBassElite,

    description:
      "Nexora Bass Elite is tuned for powerful low frequencies while maintaining a balanced listening experience across music and entertainment.",

    specifications: {
      Connectivity: "Bluetooth 5.3",
      Battery: "45 Hours",
      Driver: "45mm Bass Driver",
      Microphone: "Built-in Microphone",
      NoiseCancellation: "Active Noise Cancellation",
      Charging: "USB-C",
    },

    features: [
      "Enhanced bass response",
      "Active noise cancellation",
      "45-hour battery life",
      "Bluetooth 5.3",
      "Comfortable ear cushions",
    ],

    highlights: [
      "Powerful bass performance",
      "Immersive entertainment experience",
      "Long-lasting wireless listening",
      "Comfort-focused design",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Bass Elite", "USB-C Cable", "User Manual"],
  },



  // =========================================================
  // KEYBOARDS
  // =========================================================

 

  {
    id: 13,
    name: "Nexora RGB Keyboard Pro",
    category: "Keyboard",
    brand: "Nexora",

    price: 8999,
    rating: 4.7,
    stock: 32,

    image:
      NexoraKeyboardPro,

    description:
      "Nexora RGB Keyboard Pro combines mechanical performance with customizable RGB lighting for gaming and professional setups.",

    specifications: {
      Switches: "Hot-Swappable Mechanical",
      Connection: "USB-C",
      Layout: "Full Size",
      Backlight: "Per-Key RGB",
      KeyRollover: "N-Key Rollover",
      Compatibility: "Windows, macOS",
    },

    features: [
      "Hot-swappable mechanical switches",
      "Per-key RGB lighting",
      "USB-C connection",
      "N-key rollover",
      "Gaming-focused design",
    ],

    highlights: [
      "Highly responsive typing",
      "Customizable RGB lighting",
      "Built for gaming setups",
      "Flexible mechanical configuration",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: [
      "Nexora RGB Keyboard Pro",
      "USB-C Cable",
      "Keycap Tool",
      "User Manual",
    ],
  },

  // =========================================================
  // MICE
  // =========================================================

  {
    id: 14,
    name: "Nexora Precision Mouse",
    category: "Mouse",
    brand: "Nexora",

    price: 3999,
    rating: 4.4,
    stock: 64,

    image:
      NexoraPrecisionMouse,

    description:
      "Nexora Precision Mouse is designed for accurate everyday navigation, productivity and comfortable long-duration computer use.",

    specifications: {
      Sensor: "Optical Sensor",
      DPI: "1600 DPI",
      Connection: "USB",
      Buttons: "6 Buttons",
      Tracking: "High Precision",
      Compatibility: "Windows, macOS",
    },

    features: [
      "High-precision optical sensor",
      "Ergonomic design",
      "Six programmable buttons",
      "Smooth tracking",
      "Comfortable grip",
    ],

    highlights: [
      "Precise everyday navigation",
      "Comfortable ergonomic design",
      "Ideal for productivity",
      "Smooth and accurate tracking",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Precision Mouse", "USB Cable", "User Manual"],
  },

  {
    id: 15,
    name: "Nexora Gaming Mouse X",
    category: "Mouse",
    brand: "Nexora",
    price: 6019,
    originalPrice: 6999,
    discount: 14,
    onOffer: true,
    rating: 4.6,
    stock: 41,

    image:
      NexoraGamingMouse,

    description:
      "Nexora Gaming Mouse X is designed for competitive gaming with responsive tracking, programmable controls and a lightweight ergonomic shape.",

    specifications: {
      Sensor: "High Precision Optical Sensor",
      DPI: "16000 DPI",
      Connection: "USB",
      Buttons: "8 Programmable Buttons",
      PollingRate: "1000Hz",
      Compatibility: "Windows",
    },

    features: [
      "16,000 DPI precision",
      "8 programmable buttons",
      "1000Hz polling rate",
      "Lightweight gaming design",
      "RGB lighting",
    ],

    highlights: [
      "Designed for competitive gaming",
      "High-precision tracking",
      "Fast and responsive controls",
      "Customizable gaming experience",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Gaming Mouse X", "USB Cable", "User Manual"],
  },

  // =========================================================
  // ACCESSORIES
  // =========================================================

  {
    id: 16,
    name: "Nexora USB-C Hub",
    category: "Accessories",
    brand: "Nexora",

    price: 4499,
    rating: 4.3,
    stock: 55,

    image:
     NexoraUsbChub,

    description:
      "Nexora USB-C Hub expands your laptop connectivity with multiple ports for displays, storage devices, peripherals and charging.",

    specifications: {
      Interface: "USB-C",
      Ports: "HDMI, USB-A, USB-C",
      HDMIOutput: "4K",
      PowerDelivery: "100W",
      Material: "Aluminium Alloy",
      Compatibility: "Windows, macOS",
    },

    features: [
      "Multiple connectivity ports",
      "4K HDMI output",
      "100W power delivery",
      "Compact aluminium design",
      "Plug-and-play operation",
    ],

    highlights: [
      "Expand laptop connectivity",
      "Compact travel-friendly design",
      "High-speed peripheral support",
      "Ideal for modern USB-C laptops",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora USB-C Hub", "USB-C Cable", "User Manual"],
  },

  {
    id: 17,
    name: "Nexora Laptop Stand",
    category: "Accessories",
    brand: "Nexora",

    price: 2999,
    rating: 4.4,
    stock: 48,

    image:
      LaptopStand,

    description:
      "Nexora Laptop Stand provides a stable and ergonomic platform for laptops while helping create a cleaner and more comfortable workspace.",

    specifications: {
      Material: "Aluminium Alloy",
      Compatibility: "Up to 17-inch Laptops",
      Adjustment: "Height Adjustable",
      Design: "Foldable",
      Weight: "1.2 kg",
      LoadCapacity: "10 kg",
    },

    features: [
      "Adjustable viewing height",
      "Foldable design",
      "Aluminium alloy construction",
      "Stable anti-slip base",
      "Supports laptops up to 17 inches",
    ],

    highlights: [
      "Improves desk ergonomics",
      "Premium aluminium construction",
      "Portable foldable design",
      "Suitable for home and office setups",
    ],

    warranty: "1 Year Warranty",

    delivery: "Free delivery available",

    inTheBox: ["Nexora Laptop Stand", "Protective Pouch", "User Manual"],
  },
];

export default products;


export const productGalleryImages = {
  Laptop: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=85",
  ],
  Desktop: [
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1000&q=85",
  ],
  Headphones: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=85",
  ],
  Keyboard: [
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=85",
  ],
  Mouse: [
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=85",
  ],
};