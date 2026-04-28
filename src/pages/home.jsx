import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingButtons from "../components/FloatingButtons";

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero ke andar already #home ID ho ya main div pe */}
      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="services">
        <Services />
      </div>

      {/* Moving section — same as services ya alag */}
      <div id="moving">
        {/* Agar alag Moving component hai to yahan lagao */}
      </div>

      <div id="gallery">
        {/* Before & After Gallery — baad mein add karna */}
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Home;