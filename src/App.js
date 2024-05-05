import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screens/Admin";
import Comments from "./pages/admin/screens/comments/Comments";
import ManagePosts from "./pages/admin/screens/posts/ManagePosts";
import EditPost from "./pages/admin/screens/posts/EditPost";
import Categories from "./pages/admin/screens/categories/Categories";
import EditCategories from "./pages/admin/screens/categories/EditCategories";
import Users from "./pages/admin/screens/users/Users";
import BlogPage from "./pages/blog/BlogPage";
import DarkModeToggle from "./components/DarkMode/DarkModeToggle";

import MemberLayout from "./pages/member/MemberLayout";
import Member from "./pages/member/screens/Member";
import MemberManagePosts from "./pages/member/screens/posts/MemberManagePosts";
import MemberEditPost from "./pages/member/screens/posts/MemberEditPost";
import MemberShipPage from "./pages/pricing/MemberShipPage";
import PaymentSuccess from "./pages/pricing/PaymentSuccess";

import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./pages/pricing/PaymentForm";
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="App font-opensans">
      <div className={isDarkMode ? "dark" : "light"}>
        <Routes>
          {/* Normal User Routes */}
          <Route
            index
            path="/"
            element={<HomePage isDarkMode={isDarkMode} />}
          />
          <Route path="/blog" element={<BlogPage isDarkMode={isDarkMode} />} />
          <Route
            path="/blog/:slug"
            element={<ArticleDetailPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/register"
            element={<RegisterPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/login"
            element={<LoginPage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/profile"
            element={<ProfilePage isDarkMode={isDarkMode} />}
          />
          <Route
            path="/pricing"
            element={<MemberShipPage />}
          />
          <Route
            path="/payment"
            element={<Elements stripe={stripePromise}><PaymentForm /></Elements>}
          />
          <Route
            path="/success"
            element={<PaymentSuccess/>}
          />
          
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="comments" element={<Comments />} />
            <Route path="posts/manage" element={<ManagePosts />} />
            <Route path="posts/manage/edit/:slug" element={<EditPost />} />
            <Route path="categories/manage" element={<Categories />} />
            <Route
              path="categories/manage/edit/:slug"
              element={<EditCategories />}
            />
            <Route path="users/manage" element={<Users />} />
          </Route>

          {/* Member Routes */}
          <Route path="/member" element={<MemberLayout />}>
            <Route index element={<Member />} />
            {/* <Route path="comments" element={<Comments />} /> */}
            <Route path="posts/manage" element={<MemberManagePosts />} />
            <Route
              path="posts/manage/edit/:slug"
              element={<MemberEditPost />}
            />
            {/* <Route path="categories/manage" element={<Categories />} />
            <Route
              path="categories/manage/edit/:slug"
              element={<EditCategories />}
            />
            <Route path="users/manage" element={<Users />} /> */}
          </Route>
        </Routes>
        <Toaster />
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
}

export default App;
