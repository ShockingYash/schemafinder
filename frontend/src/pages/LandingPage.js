import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, FileText, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-2xl font-bold text-[#1e3a8a]">Jan-Seva</h2>
            <div className="flex gap-4">
              {isLoggedIn ? (
                <>
                  <button
                    data-testid="nav-saved-btn"
                    onClick={() => navigate('/saved')}
                    className="text-[#1e3a8a] hover:bg-blue-50 hover:text-[#172554] px-4 py-2 rounded-lg transition-colors"
                  >
                    Saved Schemes
                  </button>
                  <button
                    data-testid="nav-quiz-btn"
                    onClick={() => navigate('/quiz')}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg"
                  >
                    Start Quiz
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-testid="nav-login-btn"
                    onClick={() => navigate('/login')}
                    className="text-[#1e3a8a] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                  <button
                    data-testid="nav-signup-btn"
                    onClick={() => navigate('/signup')}
                    className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-full transition-all shadow-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div 
              className="md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-[#0f172a] mb-6">
                Find Government Schemes Made for You
              </h1>
              <p className="text-lg leading-relaxed text-[#475569] mb-8">
                Answer 10 simple questions and discover government benefits you're eligible for. From education to housing, healthcare to pensions.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  data-testid="hero-start-btn"
                  onClick={() => navigate(isLoggedIn ? '/quiz' : '/signup')}
                  className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                >
                  Start Eligibility Check
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] hover:bg-blue-50 font-medium px-8 py-3 rounded-full transition-all"
                >
                  Learn More
                </button>
              </div>
            </motion.div>
            <motion.div 
              className="md:col-span-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/flagged/photo-1579503429289-6de86c9fc2de?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Diverse Indian citizens"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-tight text-[#0f172a] mb-4">How It Works</h2>
            <p className="text-lg text-[#475569]">Simple, fast, and accurate</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-[#1e3a8a]" size={32} />
              </div>
              <h3 className="text-2xl font-medium text-[#0f172a] mb-2">Answer Quiz</h3>
              <p className="text-[#475569]">10 simple questions about your age, income, occupation, and category</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-[#ea580c]" size={32} />
              </div>
              <h3 className="text-2xl font-medium text-[#0f172a] mb-2">Get Results</h3>
              <p className="text-[#475569]">Instantly see schemes you're eligible for with required documents</p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-[#059669]" size={32} />
              </div>
              <h3 className="text-2xl font-medium text-[#0f172a] mb-2">Apply Now</h3>
              <p className="text-[#475569]">Direct links to official portals to complete your application</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f3f4f6]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl tracking-tight text-[#0f172a] mb-4">Available Schemes</h2>
            <p className="text-lg text-[#475569]">50+ government schemes across categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Education', 'Agriculture', 'Health', 'Pension', 'Women', 'Employment', 'Housing', 'Financial'].map((category, idx) => (
              <motion.div
                key={category}
                className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <h3 className="text-lg font-medium text-[#1e3a8a]">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#1e3a8a] text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <Users size={48} className="mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl tracking-tight mb-4">Who Can Benefit?</h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-8 opacity-90">
            Students, Farmers, Women, Senior Citizens, Unemployed, Self-employed, Differently-abled — government schemes are designed for everyone.
          </p>
          <button
            data-testid="cta-start-btn"
            onClick={() => navigate(isLoggedIn ? '/quiz' : '/signup')}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            Check Your Eligibility Now
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center text-[#475569]">
          <p>© 2024 Jan-Seva. Empowering citizens with knowledge of their rights.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
