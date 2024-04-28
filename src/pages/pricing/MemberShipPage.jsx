import React from "react";
import { FcInfo } from "react-icons/fc";
import { motion } from "framer-motion";
import { fadeIn } from "./variants";
import Header from "../../components/Header";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MemberShipPage = ({isDarkMode}) => {
  const userState = useSelector((state) => state.user);

  const advancedPackage = {
    name: "Unlock World Of Wisdom",
    monthlyPrice: 39,
    yearlyPrice: 399,
    description:
      "Join us as a member for boundless posting privileges and unite with a global community passionate about top-tier blog content.",
    green: "/src/assets/green-dot.png",
  };

  return (
    <>
      <Header isDarkMode={isDarkMode}/>
      <div
        className="py-10 md:px-14 px-4 max-w-screen-2xl mx-auto"
        id="pricing"
      >
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-1 lg:w-1/3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto"
        >
          {/* Render only the "Advanced" package */}
          <div className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-[#010851] font-sans">
              {advancedPackage.name}
            </h3>
            <p className="text-tertiary text-center my-6 font-roboto">
              {advancedPackage.description}
            </p>
            <p className="mt-5 text-center text-secondary text-4xl font-bold">
              ${advancedPackage.yearlyPrice}
              <span className="text-base text-tertiary font-medium font-sans">
                {" "}
                (eternal)
              </span>
            </p>
            <ul className="mt-4 space-y-2 px-4">
              <li className="flex items-center">
                <FcInfo className="mr-2 text-xl" />
                Videos of Lessons
              </li>
              <li className="flex items-center">
                <FcInfo className="mr-2 text-xl" />
                Homework check
              </li>
              <li className="flex items-center">
                <FcInfo className="mr-2 text-xl" />
                Additional practical task
              </li>
              <li className="flex items-center">
                <FcInfo className="mr-2 text-xl" />
                Monthly conferences
              </li>
              <li className="flex items-center">
                <FcInfo className="mr-2 text-xl" />
                Personal advice from teachers
              </li>
            </ul>

            {/* button */}
            <div className="w-full mx-auto flex items-center justify-center mt-5">
              {userState.userInfo ? (
                <Link to="/">
                  <button className="mt-6 px-10 text-secondary border border-secondary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg">
                    Get Started
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="mt-6 px-10 text-secondary border border-secondary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg">
                    Get Started
                  </button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MemberShipPage;
