import { useState } from "react";
import { motion } from "framer-motion";
import { Send, LinkedinIcon, GithubIcon, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create a Service (Gmail, Outlook, etc.) → copy the Service ID below
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    → copy the Template ID below
// 4. Go to Account → API Keys → copy your Public Key below
const EMAILJS_SERVICE_ID = "service_o2zxiea";
const EMAILJS_TEMPLATE_ID = "template_37ywffo";
const EMAILJS_PUBLIC_KEY = "AVNHDpS4e1BKA9vdy";
// ─────────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-primary text-sm mb-2 tracking-widest uppercase">Connect</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Get In Touch</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-5"
        >
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm text-muted-foreground mb-1.5 font-medium"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                disabled={isLoading}
                value={form[field.id as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                aria-describedby={status === "error" ? "form-status" : undefined}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50"
                placeholder={`Your ${field.label.toLowerCase()}`}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="message"
              className="block text-sm text-muted-foreground mb-1.5 font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              disabled={isLoading}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-describedby={status === "error" ? "form-status" : undefined}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none disabled:opacity-50"
              placeholder="Your message..."
            />
          </div>

          {/* Feedback messages */}
          {status === "success" && (
            <div id="form-status" role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-primary font-medium">
              <CheckCircle size={16} aria-hidden="true" />
              Message sent! I'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div id="form-status" role="alert" aria-live="assertive" className="flex items-center gap-2 text-sm text-destructive font-medium">
              <AlertCircle size={16} aria-hidden="true" />
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary-cyber w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-6 mt-10"
        >
          {[
            { icon: GithubIcon, href: "https://github.com/feynet1", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://www.linkedin.com/in/feyisa-girma-290bb5371", label: "LinkedIn" },
            { icon: Mail, href: "mailto:feyisagirmanegessa@gmail.com", label: "Email" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <social.icon size={22} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
