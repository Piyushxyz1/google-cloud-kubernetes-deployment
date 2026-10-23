import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { API_URL } from "../../config/api";


import "./auth.css";

const Login = () => {
   const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/login`,
        formData
      );

      const { token } = response.data;

      // Redux login reducer:
      // token Redux state me set hoga
      // aur localStorage me bhi save hoga
      dispatch(login(token));

      toast.success("Login successful!");

      navigate("/home");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT SHOWCASE ================= */}

      <section className="auth-showcase">

        <div className="auth-showcase-content">

          <Link to="/" className="auth-logo">
            <strong>NEXORA</strong>
            <span>TECHNOLOGIES</span>
          </Link>

          <div className="auth-badge">
            ✦ NEXT-GEN TECHNOLOGY
          </div>

          <h1>
            Technology
            <br />
            <span>Made Smarter.</span>
          </h1>

          <p>
            Discover premium laptops, smartphones, gaming gear
            and smart technology designed for the way you live,
            work and play.
          </p>

          <div className="auth-tech-visual">

            <img
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"
              alt="Technology"
            />

          </div>

        </div>

      </section>


      {/* ================= LOGIN FORM ================= */}

      <section className="auth-form-section">

        <div className="auth-form-container">

          <Link to="/" className="mobile-auth-logo">
            <strong>NEXORA</strong>
            <span>TECHNOLOGIES</span>
          </Link>

          <div className="auth-heading">

            <span>WELCOME BACK</span>

            <h2>
              Sign in to your
              <br />
              <em>account.</em>
            </h2>

            <p>
              Enter your details to continue your NEXORA journey.
            </p>

          </div>


          <form onSubmit={handleSubmit} className="auth-form">

            <div className="auth-field">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>


            <div className="auth-field">

              <div className="password-label">
                <label>Password</label>

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="password-input">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="submit"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>


            <div className="auth-options">

              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>


            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <LogIn size={18} />
                </>
              )}

            </button>

          </form>


          <div className="auth-switch">

            <span>Don't have an account?</span>

            <Link to="/signup">
              Create account
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Login;