import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProducts } from '../redux/slices/ProductSlice';
import ProductList from '../Components/Productlist';
import './Home.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  const carouselImages = [
    "https://media.licdn.com/dms/image/D4D22AQEYYABohjGdsQ/feedshare-shrink_2048_1536/0/1691568591190?e=2147483647&v=beta&t=GreGBVQFbm6Y1x-xDybcFoaTir7hK4vpYBIapP6O51A",
    "https://auto-illustrierte.ch/assets/cache/1920/960/media/Artikel/220817%20Porsche%20911%20GT3%20RS/2023%20Porsche%20911%20GT3%20RS%2010.jpg",
    "https://www.topgear.com/sites/default/files/2022/10/1%20Porsche%20911%20GT3%20RS.jpg",
    "https://newsroom.porsche.com/.imaging/mte/porsche-templating-theme/teaser_720x406x2/dam/pnr/2022/Products/911-GT3-RS-Premiere/Interieur/_AKOS7823_edit_V02_highres.jpeg/jcr:content/_AKOS7823_edit_V02_highres.jpeg",
    "https://www.supercarclub.pl/wp-content/uploads/2024/01/PORSCHE-911-GT3RS-scaled.jpg",
    "https://files.porsche.com/filestore/galleryimagerwd/france/none/modelseries-911gt3-rs-gallery-france-image/zoom2/ae903f0a-131e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
    "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-02/zoom2/7439f13f-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  ];

  const testimonials = [
    {
      text: "The Porsche GT3RS parts from this website are top-notch! They've taken my car's performance to the next level.",
      author: "Habib"
    },
    {
      text: "Exceptional quality and service. I'm impressed with how these parts have improved my GT3RS.",
      author: "Sabrine"
    },
    {
      text: "Fast shipping and great customer support. Will definitely buy from here again!",
      author: "Marouane"
    },
    {
      text: "The attention to detail in these parts is amazing. My GT3RS feels like a completely new car.",
      author: "Mamoun"
    },
    {
      text: "Couldn't be happier with my purchase. These parts are worth every penny.",
      author: "Omar"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <img
          src="https://files.porsche.com/filestore/image/multimedia/none/992-gt3-rs-modelimage-sideshot/model/cfbb8ed3-1a15-11ed-80f5-005056bbdc38/porsche-model.png"
          alt="Porsche GT3RS"
          className="hero-image"
        />
        <h1 className="hero-title">Unleash the <span className='power'>Power</span></h1>
        <p className="hero-subtitle">Upgrade your Porsche GT3<span className='rs'>RS</span> with our premium parts</p>
      </div>

      <div className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <ProductList products={products.slice(0, 3)} />
      </div>

      <div className="carousel-section">
        <div className="carousel-container">
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Porsche Slide ${index + 1}`}
              className={`carousel-image ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="product-categories">
        <h2 className="section-title">Explore Parts Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img
              src="https://hips.hearstapps.com/vidthumb/images/230911-gfp-093046d-6511d50636b22.jpg?crop=1.00xw:1.00xh;0,0"
              alt="Engine Parts"
              className="category-image"
            />
            <h3 className="category-title">Engine</h3>
          </div>
        </div>
      </div>

      <div className="all-products">
        <h2 className="section-title">All Products</h2>
        <ProductList products={products} />
      </div>

      <div className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-carousel">
          <button className="testimonial-nav prev" onClick={prevTestimonial} aria-label="Previous testimonial">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          <div className="testimonial-card">
            <p className="testimonial-text">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="testimonial-author">- {testimonials[currentTestimonial].author}</p>
          </div>
          <button className="testimonial-nav next" onClick={nextTestimonial} aria-label="Next testimonial">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="cta-section">
        <h2 className="cta-title">Elevate Your Driving Experience</h2>
        <button className="cta-button" onClick={scrollToTop}>Scroll to Top</button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <p>Sousse</p>
            <p>Sahloul</p>
            <p>Phone: (216) 20 202 202</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Follow Us</h3>
            <ul className="social-links">
              <li>
                <a href="https://facebook.com" aria-label="Facebook">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="https://instagram.com" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Newsletter</h3>
            <p>Subscribe to our newsletter for updates and special offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <p className="footer-copyright">&copy; 2024 German Parts. All rights reserved.</p>
      </footer>

      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default Home;