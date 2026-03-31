import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Tourism from "../components/Tourism";
import Location from "../components/Location";
import Events from "../components/Events";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Tourism />
      <Location />
      <Events />
    </main>
  );
}
