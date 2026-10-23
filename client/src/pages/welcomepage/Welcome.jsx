
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  Sparkles,
} from "lucide-react";
import Welcomebanner from"../../assets/images/welcome/banner.avif"
import laptopIntro from"../../assets/images/welcome/laptop-intro-page.avif"
import MobileIntro from"../../assets/images/welcome/mobile-intro-page.avif"
import GamingIntro from"../../assets/images/welcome/gaming-intro-page.avif"

import "./welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-page">


      {/* ================= HERO ================= */}
      <main>

        <section className="welcome-hero">

          <div className="welcome-hero-content">

            <div className="welcome-badge">
              <Sparkles size={15} />
              NEXT-GEN TECHNOLOGY
            </div>

            <h1>
              Technology
              <br />
              <span>Made Smarter.</span>
            </h1>

            <p>
              Discover premium laptops, smartphones, gaming gear and
              smart technology designed for the way you live, work
              and play.
            </p>

            <div className="welcome-hero-buttons">
              <Link to="/signup" className="welcome-primary-btn">
                Explore NEXORA
                <ArrowRight size={19} />
              </Link>

              <Link to="/login" className="welcome-secondary-btn">
                Sign In
              </Link>
            </div>

            <div className="welcome-trust">
              <div>
                <ShieldCheck size={18} />
                <span>Secure Shopping</span>
              </div>

              <div>
                <Zap size={18} />
                <span>Latest Technology</span>
              </div>

              <div>
                <Truck size={18} />
                <span>Fast Delivery</span>
              </div>
            </div>

          </div>

          {/* ================= HERO BACKGROUND IMAGE ================= */}
          <div className="welcome-hero-visual">

            <div className="welcome-image-glow"></div>

            <div className="welcome-image-card">
              <img
                src={Welcomebanner}
                alt="welcome-banner"
              />

              <div className="welcome-image-overlay"></div>

              <div className="welcome-floating-card">
                <span className="floating-label">
                  FEATURED
                </span>

                <strong>
                  Power meets
                  <br />
                  precision.
                </strong>
              </div>
            </div>

          </div>

        </section>

        {/* ================= CATEGORY SECTION ================= */}
        <section className="welcome-categories">

          <div className="welcome-section-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Everything you need.</h2>
            </div>

            <p>
              From everyday essentials to powerful tech,
              discover products built for the future.
            </p>
          </div>

          <div className="welcome-category-grid">

            <Link to="/products" className="welcome-category-card large">
              <img
                src={laptopIntro}
                alt="Laptop"
              />

              <div className="category-overlay"></div>

              <div className="category-content">
                <span>01</span>
                <h3>Laptops</h3>
                <p>Power your ideas.</p>
                <ArrowRight size={20} />
              </div>
            </Link>

            <Link to="/products" className="welcome-category-card">
              <img
                src={MobileIntro}
                alt="Smartphone"
              />

              <div className="category-overlay"></div>

              <div className="category-content">
                <span>02</span>
                <h3>Smartphones</h3>
                <p>Stay connected.</p>
                <ArrowRight size={20} />
              </div>
            </Link>

            <Link to="/products" className="welcome-category-card">
              <img
                src={GamingIntro}
                alt="Gaming setup"
              />

              <div className="category-overlay"></div>

              <div className="category-content">
                <span>03</span>
                <h3>Gaming</h3>
                <p>Play without limits.</p>
                <ArrowRight size={20} />
              </div>
            </Link>

          </div>

        </section>

        {/* ================= BOTTOM CTA ================= */}
        <section className="welcome-cta">

          <div className="welcome-cta-content">
            <span>THE NEXORA EXPERIENCE</span>

            <h2>
              Upgrade the way
              <br />
              <em>you experience technology.</em>
            </h2>

            <p>
              Join NEXORA and discover technology selected
              for people who expect more.
            </p>

            <Link to="/signup" className="welcome-primary-btn">
              Create Your Account
              <ArrowRight size={19} />
            </Link>
          </div>

        </section>

      </main>

      
   

    </div>
  );
};

export default Welcome;

