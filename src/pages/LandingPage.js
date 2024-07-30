import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';
import { FaArrowUp, FaBars, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import Logo from "./Logo.png";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaYoutube } from 'react-icons/fa';


const galleryImages = [
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-01/zoom2/6d533072-117c-11ed-80f5-005056bbdc38;sI;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-02/zoom2/7439f13f-117c-11ed-80f5-005056bbdc38;sI;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-03/zoom2/7aff50b3-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-04/zoom2/8141901d-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-05/zoom2/6ed1b862-28ef-11ed-80f7-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-06/zoom2/b108eb0a-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/france/none/modelseries-911gt3-rs-gallery-france-image/zoom2/ae903f0a-131e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-08/zoom2/c6fcacbd-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-09/zoom2/e49ab0a4-117c-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-11/zoom2/2723ffea-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-15/zoom2/61360001-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-16/zoom2/7336d119-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-17/zoom2/7a2bdf75-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-18/zoom2/835f8b1f-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-19/zoom2/8dc204af-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-20/zoom2/b233b6b1-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-21/zoom2/c2afe48f-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-22/zoom2/ce249011-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-23/zoom2/e4c3fbe5-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-24/zoom2/eb1486f2-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-25/zoom2/f9e126c9-117d-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-26/zoom2/03c541e0-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-27/zoom2/0bcee463-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-28/zoom2/1a5b2431-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-29/zoom2/277cfb06-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-30/zoom2/375bcdaf-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-31/zoom2/3d8d57ee-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-32/zoom2/477d5ecc-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp",
  "https://files.porsche.com/filestore/galleryimagerwd/multimedia/none/modelseries-911gt3-rs-gallery-33/zoom2/4ea9447c-117e-11ed-80f5-005056bbdc38;sH;twebp/porsche-zoom2.webp"
];





const carColors = {
  red: 'https://pics.porsche.com/rtt/iris?COSY-EU-100-1713c6eK12UC31P3T5JOCU%25hjdmiTDDmvMXlHWguCuq6Q44RtRHo9ZAaDj6u5PNI7tGW3rNbZJNKXv9Z7KcQQ%25yFN5tFAsXrw4r3wo0qnqZr8MCnR4i84tV2YN2OmNyW1QGWgCWKMUuyO3L7KMHfehQ5YCpNFouiKyXd67Q9br3uwrD1XEUAVY8QwZoh4XP49WLrNb4Otw9xeXi69skh5H',
  black: 'https://pics.porsche.com/rtt/iris?COSY-EU-100-1713c6eK12UC31P3T5JOCU%25hjdmiTDDmvMXlHWguCuq6Q44RtRHo9ZAaDj6u5PNI7tGW3rNbZJNKXv9Z7KcQQ%25yFN5tFAsXrw4r3wo0qnqZr8MCnR4i84tV2YN2OmNyW1QGWgCWKMUuyO3L7KMHfehQ5WCpNFouiKyXd67Q9br3uwrD1XEUAVY8QwZoh4XP49WLrNb4Otw9xeXi69skh5H',
  grey: 'https://pics.porsche.com/rtt/iris?COSY-EU-100-1713c6eK12UC31P3T5JOCU%25hjdmiTDDmvMXlHWguCuq6Q44RtRHo9ZAaDj6u5PNI7tGW3rNbZJNKXv9Z7KcQQ%25yFN5tFAsXrw4r3wo0qnqZr8MCnR4i84tV2YN2OmNyW1QGWgCWKMUuyO3L7KMHfehQ5YCqgfNP9KyXd67Q9br3uwrD1XEUAVY8QwZoh4XP49WLrNb4Otw9xeXi69skh5H',
};

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentColor, setCurrentColor] = useState('red');
  const heroVideoRef = useRef(null);
  const overviewVideoRef = useRef(null);
  const thirdVideoRef = useRef(null);
  const fourthVideoRef = useRef(null);
  const fifthVideoRef = useRef(null);
  const backgroundAudioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrollPosition(currentScrollPosition);
      setShowScrollToTop(currentScrollPosition > 200);

      const heroHeight = window.innerHeight;
      const opacity = 1 - (currentScrollPosition / heroHeight);
      setHeroOpacity(Math.max(0, opacity));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const videos = [heroVideoRef, overviewVideoRef, thirdVideoRef, fourthVideoRef, fifthVideoRef];
    const audioElement = backgroundAudioRef.current;

    videos.forEach(videoRef => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Video autoplay was prevented. User interaction may be required.");
        });
      }
    });

    if (audioElement) {
      audioElement.volume = 0.5;
      audioElement.play().catch(error => {
        console.log("Background audio autoplay was prevented. User interaction is required to play the audio.");
      });
    }

    return () => {
      videos.forEach(videoRef => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      });
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const ColorSelector = ({ colors, currentColor, onColorChange }) => (
    <div className="color-selector">
      {Object.keys(colors).map((color) => (
        <button
          key={color}
          className={`color-option ${color} ${currentColor === color ? 'active' : ''}`}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );

  return (
    <div className="landing-page">
      <header className={`landing-header ${scrollPosition > 50 ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo-container">
            <img src={Logo} alt="Logo" className="logo" />
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <FaBars />
          </button>
          <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#overview" onClick={toggleMenu}>{t('overview')}</a></li>
              <li><a href="#design" onClick={toggleMenu}>{t('design')}</a></li>
              <li><a href="#performance" onClick={toggleMenu}>{t('performance')}</a></li>
              <li><a href="#gallery" onClick={toggleMenu}>{t('gallery')}</a></li>
            </ul>
          </nav>
          <Link to="/home" className="home-button" onClick={toggleMenu}>{t('goToShop')}</Link>
          <button onClick={toggleMute} className="mute-toggle">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <div className="language-selector">
            <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="video-background">
            <video ref={heroVideoRef} autoPlay loop muted playsInline>
              <source src="/videos/first.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
          </div>
          <div className="video-overlay"></div>
          <div className="hero-content" style={{ opacity: heroOpacity }}>
            <h1>{t('heroTitle')}</h1>
            <p>{t('heroSubtitle')}</p>
          </div>
        </section>

        <section id="overview" className="overview">
          <div className="overview-video">
            <video ref={overviewVideoRef} autoPlay loop muted playsInline>
              <source src="/videos/second.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
            <div className="video-overlay"></div>
          </div>
          <div className="section-content">
            <h2>{t('overviewTitle')}</h2>
            <p>{t('overviewDescription')}</p>
          </div>
        </section>

        <section id="third-video" className="third-video">
          <div className="third-video-container">
            <video ref={thirdVideoRef} autoPlay loop muted playsInline>
              <source src="/videos/third.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
            <div className="video-overlay"></div>
          </div>
          <div className="section-content">
            <h2>{t('precisionEngineering')}</h2>
            <p>{t('precisionDescription')}</p>
          </div>
        </section>

        <section id="fourth-video" className="fourth-video">
          <div className="fourth-video-container">
            <video ref={fourthVideoRef} autoPlay loop muted playsInline>
              <source src="/videos/4.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
            <div className="video-overlay"></div>
          </div>
          <div className="section-content">
            <h2>{t('uncompromising')}</h2>
            <p>{t('uncompromisedDescription')}</p>
          </div>
        </section>

        <section id="fifth-video" className="fifth-video">
          <div className="fifth-video-container">
            <video ref={fifthVideoRef} autoPlay loop muted playsInline>
              <source src="/videos/5.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>
            <div className="video-overlay"></div>
          </div>
          <div className="section-content">
            <h2>{t('aerodynamic')}</h2>
            <p>{t('aerodynamicDescription')}</p>
          </div>
        </section>

        <section id="design" className="design">
          <div className="section-content">
            <h2>{t('design')}</h2>
            <p>{t('designDescription')}</p>
            <img 
              className='ds' 
              src={carColors[currentColor]}
              alt="Porsche 911 GT3 RS design showcase"
            />
            <ColorSelector
              colors={carColors}
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
          </div>
        </section>

        <section id="performance" className="performance">
          <div className="section-content">
            <h2>{t('performance')}</h2>
            <p>{t('performanceDescription')}</p>
            <img 
              className='ds' 
              src='https://www.carscoops.com/wp-content/uploads/2022/10/Porsche-911-GT3-RS-Ring.jpg' 
              alt="Porsche 911 GT3 RS power showcase"
            />
          </div>
        </section>

        <section id="gallery" className="gallery">
          <div className="section-content">
            <h2>{t('gallery')}</h2>
            <div className="image-grid">
              {galleryImages.map((image, index) => (
                <div key={index} className={`image-item ${index === 0 ? 'wide' : ''}`}>
                  <img src={image} alt={`911 GT3 RS ${index + 1}`} />
                  <div className="image-overlay" onClick={() => openModal(image)}>
                    <span className="image-overlay-text">{t('viewImage')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={Logo} alt="German Parts Logo" />
          </div>
          <div className="footer-info">
            <div className="footer-description">
              <p>{t('Your trusted source for high-quality German automotive parts and accessories.')}</p>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
            <nav className="footer-nav">
              <a href="https://www.porsche.com/france/privacy-policy/">{t('privacyPolicy')}</a>
              <a href="https://www.porsche.com/france/cookies/">{t('termsOfUse')}</a>
              <a href="https://www.porsche.com/france/aboutporsche/overview/compliance/whistleblower-system/">{t('contact')}</a>
            </nav>
            <div className="footer-copyright">
              <p>© 2024 German Parts. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>


<button
  className={`scroll-to-top ${showScrollToTop ? 'show' : ''}`}
  onClick={scrollToTop}
  aria-label={t('scrollToTop')}
>
  <FaArrowUp />
</button>

{selectedImage && (
  <div className="modal" onClick={closeModal}>
    <img src={selectedImage} alt={t('selectedImage')} className="modal-image" />
  </div>
)}

<audio ref={backgroundAudioRef} src="/audio/background-audio.mp3" loop />
</div>
);
};

export default LandingPage;