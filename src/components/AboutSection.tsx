import React from "react";
import Carousel from "./Carousel";
import { useTheme } from "../theme-store";

import img1773 from "../../pics/IMG_1773.webp";
import img3476 from "../../pics/IMG_3476.webp";
import img4949 from "../../pics/IMG_4949.webp";
import img5082 from "../../pics/IMG_5082.webp";
import img5264 from "../../pics/IMG_5264.webp";
import img5706 from "../../pics/IMG_5706.webp";
import img5947 from "../../pics/IMG_5947.webp";
import img6613 from "../../pics/IMG_6613.webp";
import img8385 from "../../pics/IMG_8385.webp";
import img0171 from "../../pics/IMG_0171.webp";
import img0409 from "../../pics/IMG_0409.webp";
import img0411 from "../../pics/IMG_0411.webp";
import img1936 from "../../pics/IMG_1936.webp";
import img2095 from "../../pics/IMG_2095.webp";
import img6343 from "../../pics/IMG_6343.webp";
import img9999 from "../../pics/IMG_9999.webp";
import img1191 from "../../pics/IMG_1191.webp";
import img1248 from "../../pics/IMG_1248.webp";
import img1818 from "../../pics/IMG_1818.webp";
import img2199 from "../../pics/IMG_2199.webp";
import img2645 from "../../pics/IMG_2645.webp";
import img6303 from "../../pics/IMG_6303.webp";

const AboutSection: React.FC = () => {
  const { currentTheme } = useTheme();
  if (!currentTheme) return null;

  const images = [
    img1773,
    img3476,
    img4949,
    img5082,
    img5264,
    img5706,
    img5947,
    img6613,
    img8385,
    img0171,
    img0409,
    img0411,
    img1936,
    img2095,
    img6343,
    img9999,
    img1191,
    img1248,
    img1818,
    img2199,
    img2645,
    img6303,
  ].sort();

  return (
    <>
      <h2 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>
        About Me
      </h2>
      <p className={`${currentTheme.text} mb-4`}>
        I'm 34 and I live in Sarasota, Florida. I have been writing JavaScript
        for close to ten years now, and eight of them were in a professional
        capacity. When I'm not programming, I'm probably playing video games on
        Steam. I enjoy playing and creating music - I like to pretend I can play
        the guitar, and I can also play the piano. I use FL Studio to record and
        produce songs.
      </p>
      <p className={`${currentTheme.text} mb-4`}>
        <strong>Most importantly</strong>, I have 2 four-legged creatures in my
        house. I have a Persian cat named Pancake (because her face is{" "}
        <span className="text-xs">smushed</span>) and an English Cream golden
        retriever named Charlie. Of course I have included pictures of them,
        because I like to share.
      </p>

      <div className="w-full mt-6">
        <Carousel images={images} altPrefix="About image" />
      </div>
      <p className={`${currentTheme.text} mt-2 text-xs`}>
        Note: The above images were converted to WebP format, ensuring my
        beloved pet pictures were compressed using superior lossless tech,
        resulting in smaller file sizes, faster loading times, and better
        quality images. Panny and Charlie thank you for your time.
      </p>
    </>
  );
};

export default AboutSection;
