import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";
import { API_URL } from "../../config/api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/api/signup`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create account");
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

          <div className="auth-badge">✦ JOIN THE FUTURE</div>

          <h1>
            Your world.
            <br />
            <span>Your technology.</span>
          </h1>

          <p>
            Create your NEXORA account and unlock a smarter way to discover,
            explore and shop technology.
          </p>

        </div>
      </section>

      {/* ================= SIGNUP FORM ================= */}

      <section className="auth-form-section">
        <div className="auth-form-container">
          <Link to="/" className="mobile-auth-logo">
            <strong>NEXORA</strong>
            <span>TECHNOLOGIES</span>
          </Link>

          <div className="auth-heading">
            <span>GET STARTED</span>

            <h2>
              Create your
              <br />
              <em>account.</em>
            </h2>

            <p>Join NEXORA and experience technology differently.</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

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
              <label>Password</label>

              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label>Confirm Password</label>

              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="terms-check">
              <input type="checkbox" required />

              <span>I agree to the terms and conditions</span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <UserPlus size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-switch">
            <span>Already have an account?</span>

            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
