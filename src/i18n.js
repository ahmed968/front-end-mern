// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          heroTitle: 'The new 911 GT3 RS',
          heroSubtitle: 'Unleash the Power',
          overview: 'Overview',
          design: 'Design',
          performance: 'Performance',
          gallery: 'Gallery',
          goToShop: 'Go to Shop',
          toggleMenu: 'Toggle Menu',
          toggleMute: 'Toggle Mute',
          videoNotSupported: 'Your browser does not support the video tag.',
          overviewTitle: 'Overview',
          overviewDescription: 'Experience the pinnacle of performance with the new 911 GT3 RS.',
          precisionEngineering: 'Precision Engineering',
          precisionDescription: 'Witness the culmination of decades of racing expertise.',
          uncompromising: 'Uncompromising Performance',
          uncompromisedDescription: 'Experience the thrill of pure racing DNA.',
          aerodynamic: 'Aerodynamic Mastery',
          aerodynamicDescription: 'Sculpted for ultimate downforce and efficiency.',
          designDescription: 'Aerodynamic excellence meets iconic styling.',
          performanceDescription: 'Uncompromising power and precision on the track.',
          copyright: '© 2024 Your Company Name. All rights reserved.',
          privacyPolicy: 'Privacy Policy',
          termsOfUse: 'Terms of Use',
          contact: 'Contact',
          scrollToTop: 'Scroll to top',
          viewImage: 'View',
        }
      },
      fr: {
        translation: {
          heroTitle: 'La nouvelle 911 GT3 RS',
          heroSubtitle: 'Libérez la puissance',
          overview: 'Aperçu',
          design: 'Design',
          performance: 'Performance',
          gallery: 'Galerie',
          goToShop: 'Aller à la boutique',
          toggleMenu: 'Basculer le menu',
          toggleMute: 'Basculer le son',
          videoNotSupported: 'Votre navigateur ne prend pas en charge la balise vidéo.',
          overviewTitle: 'Aperçu',
          overviewDescription: 'Découvrez le summum de la performance avec la nouvelle 911 GT3 RS.',
          precisionEngineering: 'Ingénierie de précision',
          precisionDescription: 'Témoin de l\'aboutissement de décennies d\'expertise en course.',
          uncompromising: 'Performance sans compromis',
          uncompromisedDescription: 'Vivez le frisson de l\'ADN de course pur.',
          aerodynamic: 'Maîtrise aérodynamique',
          aerodynamicDescription: 'Sculptée pour une appui aérodynamique et une efficacité ultimes.',
          designDescription: 'L\'excellence aérodynamique rencontre un style iconique.',
          performanceDescription: 'Puissance et précision sans compromis sur la piste.',
          copyright: '© 2024 Votre nom d\'entreprise. Tous droits réservés.',
          privacyPolicy: 'Politique de confidentialité',
          termsOfUse: 'Conditions d\'utilisation',
          contact: 'Contact',
          scrollToTop: 'Retour en haut',
          viewImage: 'Voir',
          footerDescription : "Your trusted source for high-quality German automotive parts and accessories."
        }
      },
      // Add more languages as needed
    },
    lng: 'en', // Set default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
