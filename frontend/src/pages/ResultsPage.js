import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ExternalLink, Bookmark, BookmarkCheck, FileText, Award, ListChecks } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "https://jan-seva-backend.vercel.app").replace(/\/+$/, "");

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [savedSchemes, setSavedSchemes] = useState(new Set());
  const [savingScheme, setSavingScheme] = useState(null);

  const results = location.state;

  useEffect(() => {
    if (!results) {
      navigate('/quiz');
    }
  }, [results, navigate]);

  if (!results) return null;

  const { eligible_schemes = [], fallback_schemes = [] } = results;
  const allSchemes = [...eligible_schemes, ...fallback_schemes];

  const handleSave = async (schemeId) => {
    setSavingScheme(schemeId);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${BACKEND_URL}/api/schemes/save/${schemeId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedSchemes(new Set([...savedSchemes, schemeId]));
      toast.success("Scheme saved!");
    } catch (error) {
      toast.error("Failed to save scheme");
    } finally {
      setSavingScheme(null);
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
            <div className="flex items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
              <button
                data-testid="results-saved-btn"
                onClick={() => navigate('/saved')}
                className="text-[#1e3a8a] hover:bg-blue-50 hover:text-[#172554] px-3 py-2 md:px-4 rounded-lg transition-colors text-sm md:text-base"
              >
                Saved Schemes
              </button>
              <button
                data-testid="results-retake-btn"
                onClick={() => navigate('/quiz')}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-4 md:px-6 py-2 rounded-full transition-all shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12">
        {eligible_schemes.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-4">
              <Award size={24} />
              <span className="font-medium">Great news!</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0f172a] mb-4">
              You're Eligible for {eligible_schemes.length} Schemes
            </h1>
            <p className="text-lg text-[#475569]">
              We found schemes that match your profile. Review the documents needed and apply directly.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl text-[#0f172a] mb-4">
              We Found Some Schemes You Might Qualify For
            </h1>
            <p className="text-lg text-[#475569]">
              While you may not match all criteria, these schemes are worth exploring.
            </p>
          </motion.div>
        )}

        {eligible_schemes.length > 0 && (
          <section className="mb-12" data-testid="eligible-schemes-section">
            <h2 className="text-2xl md:text-3xl text-[#0f172a] mb-6 flex items-center gap-2">
              <Award className="text-[#ea580c]" size={32} />
              Eligible Schemes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligible_schemes.map((scheme, idx) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={savedSchemes.has(scheme.id)}
                  onSave={handleSave}
                  isSaving={savingScheme === scheme.id}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>
        )}

        {fallback_schemes.length > 0 && (
          <section data-testid="fallback-schemes-section">
            <h2 className="text-2xl md:text-3xl text-[#0f172a] mb-6">
              Other Schemes to Explore
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallback_schemes.map((scheme, idx) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  isSaved={savedSchemes.has(scheme.id)}
                  onSave={handleSave}
                  isSaving={savingScheme === scheme.id}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

const SchemeCard = ({ scheme, isSaved, onSave, isSaving, delay }) => {
  const applicationSteps = [
    `Check the eligibility criteria for ${scheme.name}.`,
    "Keep all required documents ready in advance.",
    "Visit the official application portal for this scheme.",
    "Fill in personal and eligibility details carefully.",
    "Upload required documents and submit the application.",
    "Save the application/reference number to track status later.",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl transition-all hover:border-blue-200 scheme-card relative overflow-hidden"
      data-testid={`scheme-card-${scheme.id}`}
    >
      {scheme.eligibility_match === 'Eligible' && (
        <div className="absolute top-0 right-0 bg-[#059669] text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          Eligible
        </div>
      )}
      
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
          data-testid={`apply-btn-${scheme.id}`}
          className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
          Apply Now
          <ExternalLink size={16} />
        </a>
        <button
          data-testid={`save-btn-${scheme.id}`}
          onClick={() => onSave(scheme.id)}
          disabled={isSaved || isSaving}
          className={`px-4 py-2 rounded-lg transition-all border-2 ${
            isSaved
              ? 'bg-blue-50 border-[#1e3a8a] text-[#1e3a8a]'
              : 'border-slate-300 text-slate-600 hover:border-[#1e3a8a] hover:bg-blue-50 hover:text-[#1e3a8a]'
          }`}
        >
          {isSaving ? (
            <span className="loading-pulse">...</span>
          ) : isSaved ? (
            <BookmarkCheck size={20} />
          ) : (
            <Bookmark size={20} />
          )}
        </button>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            data-testid={`guide-btn-${scheme.id}`}
            className="mt-3 w-full border border-[#1e3a8a] text-[#1e3a8a] hover:bg-blue-50 font-medium px-4 py-2 rounded-lg transition-all text-sm inline-flex items-center justify-center gap-2"
          >
            <ListChecks size={16} />
            Provides step-by-step guide to apply
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>How to Apply: {scheme.name}</DialogTitle>
            <DialogDescription>
              Follow these steps to complete your application.
            </DialogDescription>
          </DialogHeader>

          <ol className="space-y-3 text-sm text-slate-700 list-decimal pl-5">
            {applicationSteps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <div>
            <p className="text-sm font-medium text-[#0f172a] mb-2">Required documents</p>
            <div className="flex flex-wrap gap-2">
              {scheme.documents.map((doc, idx) => (
                <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <a
            href={scheme.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-medium px-4 py-2 rounded-lg transition-all inline-flex items-center justify-center gap-2"
          >
            Open Official Portal
            <ExternalLink size={16} />
          </a>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ResultsPage;

