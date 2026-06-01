import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { sendContactMessage } from "../services/api/contactService";

interface FormData {
  name: string;
  email: string;
  message: string;
  attachment: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  attachment?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "", attachment: null });
  const [errors, setErrors]     = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!formData.name.trim()) {
      next.name = "Name is required";
    }

    if (!formData.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      next.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      next.message = "Message must be at least 10 characters";
    }

    if (formData.attachment) {
      if (formData.attachment.size > 5 * 1024 * 1024) {
        next.attachment = "File must be smaller than 5MB";
      }
      
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
      if (!allowedTypes.includes(formData.attachment.type)) {
        next.attachment = "Invalid file type. Only PDF, DOCX, PNG, JPG allowed.";
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMsg("");

    try {
      const submitData = new window.FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      if (formData.attachment) {
        submitData.append("attachment", formData.attachment);
      }

      await sendContactMessage(submitData);

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "", attachment: null });
      setTimeout(() => setSubmitStatus("idle"), 6000);
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMsg(err.message || "Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
        const fileInput = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, attachment: fileInput.files ? fileInput.files[0] : null }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // ── Shared input classes (dark mode aware) ───────────────────────────────────
  const inputBase =
    "w-full px-4 py-3 rounded-2xl border bg-white dark:bg-gray-800 " +
    "text-gray-900 dark:text-white " +
    "placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:outline-none focus:ring-2 transition-all duration-200";

  const inputClasses = (field: keyof FormErrors) =>
    `${inputBase} ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
    }`;

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-background dark:bg-background">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ── Contact Info ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl mb-8 text-foreground font-semibold">
              Let's talk about your project
            </h3>
            <p className="text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail,    label: "Email",    value: "perricpp@gmail.com",    color: "from-purple-500 to-purple-600" },
                { icon: Phone,   label: "Phone",    value: "+91 9080812306",         color: "from-blue-500 to-blue-600"   },
                { icon: MapPin,  label: "Location", value: "Pudukkottai, Tamil Nadu", color: "from-pink-500 to-pink-600"  },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                    <p className="text-foreground font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Contact Form ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-card/60 backdrop-blur-md rounded-3xl p-8 border border-border shadow-xl space-y-6"
            >

              {/* Success alert */}
              {submitStatus === "success" && (
                <motion.div
                  className="p-4 bg-green-500/10 dark:bg-green-900/40 border border-green-500/50 dark:border-green-600 text-green-700 dark:text-green-300 rounded-2xl flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <span className="text-xl">✓</span>
                  <span>Message sent! I'll get back to you soon.</span>
                </motion.div>
              )}

              {/* Error alert */}
              {submitStatus === "error" && (
                <motion.div
                  className="p-4 bg-red-500/10 dark:bg-red-900/40 border border-red-500/50 dark:border-red-600 text-red-700 dark:text-red-300 rounded-2xl flex items-center gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <span className="text-xl">✗</span>
                  <span>{errorMsg}</span>
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-foreground font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  className={inputClasses("name")}
                />
                {errors.name && (
                  <p className="mt-1.5 text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-foreground font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  autoComplete="email"
                  className={inputClasses("email")}
                />
                {errors.email && (
                  <p className="mt-1.5 text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell me about your project..."
                  className={`${inputClasses("message")} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.message}
                  </p>
                )}
              </div>

               {/* Attachment */}
               <div>
                <label htmlFor="attachment" className="block text-foreground font-medium mb-2">
                  Attach a file (optional - PDF, DOCX, PNG, JPG up to 5MB)
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  accept=".pdf,.docx,.png,.jpg,.jpeg"
                  onChange={handleChange}
                  className={`${inputClasses("attachment")} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/30 dark:file:text-purple-300 transition-colors cursor-pointer`}
                />
                {errors.attachment && (
                  <p className="mt-1.5 text-red-500 dark:text-red-400 text-sm flex items-center gap-1">
                    <span>⚠</span> {errors.attachment}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
}