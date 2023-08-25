import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { RiInstagramLine } from "react-icons/ri";
import {
  SlSocialYoutube,
  SlSocialTwitter,
  SlLocationPin,
} from "react-icons/sl";
import FooterTitle from "./FooterTitle";
import { FaFacebookF } from "react-icons/fa";

const FooterSubscribe = () => {
  return (
    <div className="pt-2 mx-auto">
      <div>
        <h4 className="text-slate-700 font-semibold text-sm tracking-wide">
          Subscribe our newsletter to get discount upto 50%
        </h4>
      </div>
      <div
        className="relative
       flex flex-row bg-white shadow-lg max-w-sm p-2 rounded-md mt-4"
      >
        <input
          type="text"
          className="w-full border-none focus:ring-0 text-base"
          placeholder="Enter your email address"
        />
        <button
          className="
        absolute
        right-0
        top-0
        p-2
        text-white
        bg-orange-500
        h-full
        rounded-r-md
        
        "
          type="submit"
        >
          Subscribe
        </button>
      </div>
      <div className="py-4">
        <FooterTitle title="Follow Us" />
        <div className="flex items-center gap-4">
          <motion.span
            className="text-2xl text-slate-700 bg-white p-2 shadow-xl rounded-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <FaFacebookF />
          </motion.span>
          <motion.span
            className="text-2xl text-slate-700 bg-white p-2 shadow-xl rounded-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <AiOutlineInstagram />
          </motion.span>
          <motion.span
            className="text-2xl text-slate-700 bg-white p-2 shadow-xl rounded-lg cursor-pointer "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <AiOutlineTwitter />
          </motion.span>
          <motion.span
            className="text-2xl text-slate-700 bg-white p-2 shadow-xl rounded-lg cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.2 }}
          >
            <AiOutlineYoutube />
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default FooterSubscribe;
