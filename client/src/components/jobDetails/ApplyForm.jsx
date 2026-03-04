"use client";
import { useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { submitApplication } from "../../lib/api";

const initialForm = { name: "", email: "", resumeLink: "", coverNote: "" };
const ApplyForm = ({ job }) => {
  const [applying, setApplying] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address";
    if (!form.resumeLink.trim()) errs.resumeLink = "Resume link is required";
    else {
      try {
        new URL(form.resumeLink);
      } catch {
        errs.resumeLink = "Must be a valid URL (e.g. https://...)";
      }
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("object");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setApplying(true);
    try {
      await submitApplication({ ...form, job });
      setSubmitStatus("success");
      setForm(initialForm);
    } catch {
      setSubmitStatus("error");
    } finally {
      setApplying(false);
    }
  };

  const inputClass = (field) =>
    `w-full border px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors ${
      errors[field] ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
    }`;
  return (
    <div className="lg:col-span-1">
      <div className="bg-white border border-[#D6DDEB] p-6 sticky top-6">
        <h2 className="text-xl font-bold text-[#25324B] mb-5">Apply Now</h2>

        {submitStatus === "success" ? (
          <div className="text-center py-8">
            <HiOutlineCheckCircle
              size={48}
              className="text-green-500 mx-auto mb-3"
            />
            <h3 className="font-bold text-[#25324B] mb-2">
              Application Submitted!
            </h3>
            <p className="text-gray-500 text-sm mb-5">
              We'll review your application and get back to you soon.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Apply Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Resume Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={form.resumeLink}
                onChange={(e) =>
                  setForm({ ...form, resumeLink: e.target.value })
                }
                className={inputClass("resumeLink")}
              />
              {errors.resumeLink && (
                <p className="text-red-500 text-xs mt-1">{errors.resumeLink}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Cover Note{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Tell us why you're the right fit..."
                rows={4}
                value={form.coverNote}
                onChange={(e) =>
                  setForm({ ...form, coverNote: e.target.value })
                }
                className="w-full border border-[#D6DDEB] px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none transition-colors"
              />
            </div>

            {submitStatus === "error" && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={applying}
              className="w-full bg-primary text-white py-3 font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm"
            >
              {applying ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
