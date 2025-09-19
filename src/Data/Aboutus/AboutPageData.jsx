
// src/data/vinetaData.js
export const AboutPageSection = {
  title: "Welcome to Ethenova",
  subtitle: "Your Destination for Elegant Ethnic Wear",
  description: `At <span className="fw-medium">Ethenova</span>, we curate collections that celebrate culture and heritage through timeless ethnic fashion. <br className="d-none d-xl-block" />
    With over 15 years of craftsmanship and passion, we bring you styles that combine traditional grace <br className="d-none d-xl-block" />
    with modern flair — perfect for every occasion and every generation.`,
  
  image: `${import.meta.env.BASE_URL}/assets/Images/section/Beauty of Indian Sarees.jpg`,
  imageAlt: "About Ethenova",
};


export const whyChooseData = {
  title: "Why Choose Ethenova",
  description: `Our ethnic collections are a seamless fusion of tradition and modern elegance, thoughtfully crafted to help you express cultural pride with grace and sophistication. Each piece reflects timeless craftsmanship, blending rich heritage with contemporary design elements. Whether it's intricate handblock prints, contemporary cuts, or luxurious fabrics, our ensembles offer a refined aesthetic that honors the past while embracing the present. Perfect for any occasion, our collection empowers you to celebrate your roots with confidence and style.`,

  features: [
    {
      title: "Heritage with Integrity",
      content:
        "At Ethenova, we uphold traditional craftsmanship with ethical sourcing and responsible production. Every garment reflects respect for artisanship and sustainability.",
    },
    {
      title: "Elegance That Lasts",
      content:
        "From festive lehengas to everyday kurtis, our collections combine rich textures with quality stitching — built to look stunning and endure.",
    },
    {
      title: "Celebrate Individuality",
      content:
        "We offer a wide range of ethnic styles that let you showcase your personality while staying rooted in cultural charm. Fashion that's as unique as you are.",
    },
  ],

  image: `${import.meta.env.BASE_URL}/assets/Images/section/about-2.jpg`,
};

 
export const styleCuratedData = [
  {
    icon: "icon-precision",
    title: "Timeless Craftsmanship",
    description:
      "At Ethenova, we honor traditional techniques, ensuring each outfit carries the legacy of detailed artistry passed down through generations.",
  },
  {
    icon: "icon-elegance",
    title: "Grace in Every Thread",
    description:
      "Our ethnic wear embodies refined beauty — a seamless blend of elegance and comfort, perfect for every cultural celebration and everyday charm.",
  },
  {
    icon: "icon-fashion-body",
    title: "Style for Every Body",
    description:
      "Ethenova designs inclusive fashion that fits and flatters all body types, so everyone can feel confident and celebrated in traditional attire.",
  },
  {
    icon: "icon-precision",
    title: "Quality Without Compromise",
    description:
      "We use premium fabrics and meticulous tailoring to ensure your ethnic wardrobe feels luxurious and lasts through seasons and festivities.",
  },
];

 // src/Data/Aboutus/TestimonialData.jsx

 export const testimonialData = [
  {
    stars: 5,
    quote:
      "Ethenova’s ethnic collection made my festival truly special. The embroidery and fit were absolutely perfect.",
    author: "Anjali R",
    image: `${import.meta.env.BASE_URL}assets/Images/testimonial/tes-fs1.jpg`,
  },
  {
    stars: 5,
    quote:
      "The kurta set I ordered exceeded my expectations. Gorgeous fabric, timely delivery, and I got so many compliments!",
    author: "Meera S",
    image: `${import.meta.env.BASE_URL}assets/Images/testimonial/tes-fs2.jpg`,
  },
  {
    stars: 4,
    quote:
      "I was amazed by the detailing and richness of the design. Ethenova is now my favorite destination for ethnic wear!",
    author: "Karan M",
    image: `${import.meta.env.BASE_URL}assets/Images/testimonial/tes-fs3.jpg`,
  },
];
