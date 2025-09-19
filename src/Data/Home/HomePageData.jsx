const img_URL = import.meta.env.VITE_IMG_URL
export const Banner_SliderData = [
    { label: 'Shop Men', image: `${import.meta.env.BASE_URL}/assets/Images/slider/fashion/slider-fashion-2-1.png`, link: 'shop-default.html' },
    { label: 'Shop Women', image:`${import.meta.env.BASE_URL}/assets/Images/slider/fashion/slider-fashion-2-2.png`, link: 'shop-default.html' },
    { label: 'Shop Kids', image: `${import.meta.env.BASE_URL}/assets/Images/slider/fashion/slider-fashion-2-3.png`, link: 'shop-default.html' },
];

export const Top_Picks = [
        {
          imgMain: `${img_URL}/products/fashion/product-5.jpg`,
          imgHover: `${img_URL}/products/fashion/product-4.jpg`,
          discount: "20% Off",
          name: "Turtleneck T-shirt",
          priceNew: "$120.00",
          priceOld: "$150.00",
          sizes: ["XS", "S", "M", "L", "XL", "2XL"],
          colors: [
            { name: "Beige", bg: "bg-beige", img: "images/products/fashion/product-5.jpg", active: true },
            { name: "Black", bg: "bg-dark", img: "images/products/fashion/product-9.jpg", active: false },
            { name: "White", bg: "bg-white", img: "images/products/fashion/product-4.jpg", active: false },
          ],
        },

        
        {
            imgMain: `${img_URL}/products/fashion/product-12.jpg`,
            imgHover: `${img_URL}/products/fashion/product-7.jpg`,
            discount: "20% Off",
            name: "Turtleneck T-shirt",
            priceNew: "$120.00",
            priceOld: "$150.00",
            sizes: ["XS", "S", "M", "L", "XL", "2XL"],
            colors: [
              { name: "Beige", bg: "bg-beige", img: "images/products/fashion/product-5.jpg", active: true },
              { name: "Black", bg: "bg-dark", img: "images/products/fashion/product-9.jpg", active: false },
              { name: "White", bg: "bg-white", img: "images/products/fashion/product-4.jpg", active: false },
            ],
          },
          {
            imgMain: `${img_URL}/products/fashion/product-11.jpg`,
            imgHover: `${img_URL}/products/fashion/product-10.jpg`,
            discount: "20% Off",
            name: "Turtleneck T-shirt",
            priceNew: "$120.00",
            priceOld: "$150.00",
            sizes: ["XS", "S", "M", "L", "XL", "2XL"],
            colors: [
              { name: "Beige", bg: "bg-beige", img: "images/products/fashion/product-5.jpg", active: true },
              { name: "Black", bg: "bg-dark", img: "images/products/fashion/product-9.jpg", active: false },
              { name: "White", bg: "bg-white", img: "images/products/fashion/product-4.jpg", active: false },
            ],
          },
          {
            imgMain: `${img_URL}/products/fashion/product-31.jpg`,
            imgHover: `${img_URL}/products/fashion/product-27.jpg`,
            discount: "20% Off",
            name: "Turtleneck T-shirt",
            priceNew: "$120.00",
            priceOld: "$150.00",
            sizes: ["XS", "S", "M", "L", "XL", "2XL"],
            colors: [
              { name: "Beige", bg: "bg-beige", img: "images/products/fashion/product-5.jpg", active: true },
              { name: "Black", bg: "bg-dark", img: "images/products/fashion/product-9.jpg", active: false },
              { name: "White", bg: "bg-white", img: "images/products/fashion/product-4.jpg", active: false },
            ],
          },
          {
            imgMain: `${img_URL}/products/fashion/product-13.jpg`,
            imgHover: `${img_URL}/products/fashion/product-14.jpg`,
            discount: "20% Off",
            name: "Turtleneck T-shirt",
            priceNew: "$120.00",
            priceOld: "$150.00",
            sizes: ["XS", "S", "M", "L", "XL", "2XL"],
            colors: [
              { name: "Beige", bg: "bg-beige", img: "images/products/fashion/product-5.jpg", active: true },
              { name: "Black", bg: "bg-dark", img: "images/products/fashion/product-9.jpg", active: false },
              { name: "White", bg: "bg-white", img: "images/products/fashion/product-4.jpg", active: false },
            ],
          },
    
];

export const LimitedTime_Product = [
    {
        productLink: "product-detail.html",
        images: {
          mainImage: "images/products/fashion/product-10.jpg",
          hoverImage: "images/products/fashion/product-1.jpg",
        },
        sale: "20% Off",
        actions: [
          { name: "Quick Add", icon: "icon-cart2", modalTarget: "#quickAdd" },
          { name: "Add to Wishlist", icon: "icon-heart2", modalTarget: "javascript:void(0);" },
          { name: "Quick View", icon: "icon-view", modalTarget: "#quickView" },
          { name: "Add to Compare", icon: "icon-compare", modalTarget: "#compare" },
        ],
        availableSizes: ["XS", "S", "M", "L", "XL", "2XL"],
        productInfo: {
          name: "Turtleneck T-shirt",
          priceNew: "$120.00",
          priceOld: "$150.00",
        },
        colors: [
          {
            colorName: "Blue",
            swatchClass: "bg-light-blue-2",
            image: "images/products/fashion/product-10.jpg",
          },
          {
            colorName: "Orange",
            swatchClass: "bg-light-orange-2",
            image: "images/products/fashion/product-16.jpg",
          },
          {
            colorName: "White",
            swatchClass: "bg-white",
            image: "images/products/fashion/product-1.jpg",
          },
        ],
    }
]
export const brandSliderData = [
  {
    imgSrc: `${img_URL}/brand/zara.png`,
    alt: "brand",
    wowDelay: "0s", // default
  },
  {
    imgSrc: `${img_URL}/brand/bear.png`,
    alt: "brand",
    wowDelay: "0.1s",
  },
  {
    imgSrc: `${img_URL}/brand/nike.png`,
    alt: "brand",
    wowDelay: "0.2s",
  },
  {
    imgSrc: `${img_URL}/brand/asos.png`,
    alt: "brand",
    wowDelay: "0.3s",
  },
  {
    imgSrc: `${img_URL}/brand/burberry.png`,
    alt: "brand",
    wowDelay: "0.4s",
  },
  {
    imgSrc: `${img_URL}/brand/forever.png`,
    alt: "brand",
    wowDelay: "0.5s",
  },
];

export const testimonialCard =[ 
  {
  authorName: "Emily T.",
  verified: true,
  stars: 5,
  reviewText: "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
  authorAvatar: `${img_URL}/testimonial/author/author-fs1.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs1.jpg`
},
{
  authorName: "Jessica M.",
  verified: true,
  stars: 5,
  reviewText: "I love the dress I purchased! The fabric is so soft, and the fit is perfect. I’ve gotten so many compliments on it. Will definitely shop here again!",   
  authorAvatar: `${img_URL}/testimonial/author/tes-fs2.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs2.jpg`
},
{
  authorName: "Emily T.",
  verified: true,
  stars: 5,
  reviewText: "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
  authorAvatar: `${img_URL}/testimonial/author/author-fs3.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs3.jpg`
},
{
  authorName: "Emily T.",
  verified: true,
  stars: 5,
  reviewText: "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
  authorAvatar: `${img_URL}/testimonial/author/author-fs1.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs1.jpg`
},
{
  authorName: "Emily T.",
  verified: true,
  stars: 5,
  reviewText: "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
  authorAvatar: `${img_URL}/testimonial/author/author-fs1.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs1.jpg`
},
{
  authorName: "Emily T.",
  verified: true,
  stars: 5,
  reviewText: "The quality of the clothes exceeded my expectations. Every piece feels premium, and the designs are so trendy. I'm obsessed with my new wardrobe additions!",
  authorAvatar: `${img_URL}/testimonial/author/author-fs1.jpg`,
  purchasedItem: {
    name: "Crop T-shirt",
    link: "product-detail.html",
    price: "$80.00"
  },
  testimonialImage: `${img_URL}/testimonial/tes-fs1.jpg`
},

];


export const iconBoxData = [
  {
    icon: "icon-shipping",
    title: "Free Shipping",
    delay: "0s",
  },
  {
    icon: "icon-gift",
    title: "Gift Package",
    delay: "0.1s",
  },
  {
    icon: "icon-return",
    title: "Ease Returns",
    delay: "0.2s",
  },
  {
    icon: "icon-support",
    title: "ONE YEAR WARRANTY",
    delay: "0.3s",
  },
];

