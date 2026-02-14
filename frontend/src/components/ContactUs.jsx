import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, ArrowLeft, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";

const ContactUs = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Transmission successful ⚡");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#05080f] text-cyan-200 flex flex-col relative overflow-hidden">

      {/* cyber grid background */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#00ffff22_1px,transparent_1px),linear-gradient(to_bottom,#00ffff22_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* scan line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 animate-pulse shadow-[0_0_15px_#00ffff]" />

      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-[#0b1220]/70 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-8 shadow-[0_0_35px_#00ffff22] relative"
        >
          {/* glow border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[0_0_40px_#00ffff22]" />

          <button
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 p-2 text-cyan-400 hover:text-white transition rounded-full hover:bg-cyan-400/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_10px_#00ffff]">
              {t("getInTouch")}
            </h2>
            <p className="text-cyan-400/60 mt-2 text-sm">
              Secure channel established. Send your signal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input icon={<User />} name="name" placeholder={t("name")} value={formData.name} onChange={handleChange} />
            <Input icon={<Mail />} name="email" type="email" placeholder={t("email")} value={formData.email} onChange={handleChange} />
            <Input icon={<Phone />} name="phone" type="tel" placeholder={t("phone")} value={formData.phone} onChange={handleChange} />
            <Input icon={<MessageSquare />} name="subject" placeholder={t("subject")} value={formData.subject} onChange={handleChange} />

            <textarea
              name="message"
              placeholder={t("message")}
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full bg-[#030712] border border-cyan-400/30 rounded-xl py-3 px-4 text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[0_0_10px_#00ffff22] resize-none"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-400 text-black font-semibold py-3 rounded-xl shadow-[0_0_25px_#00ffffaa] hover:shadow-[0_0_45px_#00ffff] transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">{t("sending")}</span>
              ) : (
                <>
                  <Send className="h-5 w-5" /> {t("sendMessage")}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-3.5 h-5 w-5 text-cyan-400/70">
      {icon}
    </div>
    <input
      {...props}
      required={props.name !== "phone"}
      className="w-full bg-[#030712] border border-cyan-400/30 rounded-xl py-3 pl-10 pr-4 text-cyan-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[0_0_10px_#00ffff22] placeholder-cyan-500/40"
    />
  </div>
);

export default ContactUs;
