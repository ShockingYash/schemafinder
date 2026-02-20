import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Trash2, ExternalLink, FileText, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "https://jan-seva-backend.vercel.app").replace(/\/+$/, "");

const SavedPage = () => {
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingScheme, setRemovingScheme] = useState(null);

  useEffect(() => {
    fetchSavedSchemes();
  }, []);

  const fetchSavedSchemes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BACKEND_URL}/api/schemes/saved`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchemes(response.data.schemes);
    } catch (error) {
      toast.error("Failed to load saved schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (schemeId) => {
    setRemovingScheme(schemeId);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BACKEND_URL}/api/schemes/unsave/${schemeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSchemes(schemes.filter(s => s.id !== schemeId));
      toast.success("Scheme removed from saved");
    } catch (error) {
      toast.error("Failed to remove scheme");
    } finally {
      setRemovingScheme(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="py-3 md:py-0 md:h-16 flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
            <h2
              className="text-xl leading-tight md:text-2xl font-bold text-[#1e3a8a] cursor-pointer"
              onClick={() => navigate('/')}
            >
              Jan-Seva - A YojanaSetu Platform
            </h2>
            <button
              data-testid="saved-quiz-btn"
              onClick={() => navigate('/quiz')}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-4 md:px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base w-fit"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0f172a] mb-4">
            Your Saved Schemes
          </h1>
          <p className="text-lg text-[#475569]">
            Keep track of schemes you want to apply for
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="loading-pulse text-[#475569] text-lg">Loading saved schemes...</div>
          </div>
        ) : schemes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
            data-testid="no-saved-schemes"
          >
            <BookOpen size={64} className="mx-auto text-slate-300 mb-6" />
            <h2 className="text-2xl text-[#0f172a] mb-4">No Saved Schemes Yet</h2>
            <p className="text-[#475569] mb-8">Take the eligibility quiz to discover schemes for you</p>
            <button
              data-testid="empty-quiz-btn"
              onClick={() => navigate('/quiz')}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Start Quiz
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="saved-schemes-grid">
            {schemes.map((scheme, idx) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-blue-200 scheme-card"
                data-testid={`saved-scheme-${scheme.id}`}
              >
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-[#1e3a8a] px-3 py-1 rounded-full text-sm font-medium mb-3">
                    {scheme.category}
                  </span>
                  <h3 className="text-xl font-medium text-[#0f172a] mb-2">{scheme.name}</h3>
                  <p className="text-[#475569] text-sm leading-relaxed">{scheme.description}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#0f172a] mb-2 flex items-center gap-2">
                    <Award size={16} className="text-[#ea580c]" />
                    Benefits
                  </h4>
                  <ul className="space-y-1">
                    {scheme.benefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="text-sm text-[#475569] flex items-start gap-2">
                        <span className="text-[#059669] mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                    {scheme.benefits.length > 2 && (
                      <li className="text-sm text-[#94a3b8]">+{scheme.benefits.length - 2} more</li>
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#0f172a] mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-[#ea580c]" />
                    Required Documents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documents.slice(0, 3).map((doc, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        {doc}
                      </span>
                    ))}
                    {scheme.documents.length > 3 && (
                      <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                        +{scheme.documents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href={scheme.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`saved-apply-${scheme.id}`}
                    className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    Apply Now
                    <ExternalLink size={16} />
                  </a>
                  <button
                    data-testid={`remove-btn-${scheme.id}`}
                    onClick={() => handleRemove(scheme.id)}
                    disabled={removingScheme === scheme.id}
                    className="px-4 py-2 rounded-lg transition-all border-2 border-slate-300 text-slate-600 hover:border-red-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                  >
                    {removingScheme === scheme.id ? (
                      <span className="loading-pulse">...</span>
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;

