import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Blogs from "./pages/Blogs.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AddService from "./pages/admin/AddService.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import ManageServices from "./pages/admin/ManageServices.jsx";
import EditService from "./pages/admin/EditService.jsx";
import ManageBlogs from "./pages/admin/ManageBlogs.jsx";
import EditBlog from "./pages/admin/EditBlog.jsx";
import Signup from "./pages/admin/Signup.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blogs" element={<Blogs />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              // Update your routes in App.jsx
              <Route path="/admin/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/add-service" element={<AddService />} />
              <Route path="/admin/add-blog" element={<AddBlog />} />
              // Add these routes to your App.jsx
              <Route
                path="/admin/manage-services"
                element={<ManageServices />}
              />
              <Route path="/admin/edit-service/:id" element={<EditService />} />
              // Add these routes to your App.jsx
              <Route path="/admin/manage-blogs" element={<ManageBlogs />} />
              <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
