import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <section className="content-wrapper">
      <Carousel slides={["/assets/banner.png", "/assets/branded-banner.png"]} />
    </section>
  );
}
