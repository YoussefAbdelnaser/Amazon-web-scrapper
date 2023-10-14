"use client";

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgurl: "/assets/images/hero-1.svg", alt: "smart watch" },
  { imgurl: "/assets/images/hero-2.svg", alt: "bag" },
  { imgurl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imgurl: "/assets/images/hero-4.svg", alt: "air frier" },
  { imgurl: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroSlideShow = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}>
        {heroImages.map((image) => (
          <Image
            src={image.imgurl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>
      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroSlideShow;
