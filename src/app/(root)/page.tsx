import Carousel from "@/components/Carousel";
import { slides } from "@/constants";

export default function Home() {
  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />

      <div className="flex-center w-full my-8">
        <p>Categories go here</p>
      </div>
    </section>
  );
}
