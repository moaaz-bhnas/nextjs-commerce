import { Carousel } from "components/carousel";
import { HeroCarousel } from "components/hero-carousel";
import { HomeCollections } from "components/home-collections";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import {
  getShopCarouselImages,
  getShopCollectionsForHomePage,
} from "lib/shopify";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const [carouselImages, homeCollections] = await Promise.all([
    getShopCarouselImages(),
    getShopCollectionsForHomePage(),
  ]);
  return (
    <>
      <HeroCarousel images={carouselImages} />
      <ThreeItemGrid />
      <Carousel />
      <HomeCollections collections={homeCollections} />
      <Footer />
    </>
  );
}
