import React from "react";
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
/* import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New"; */

function App() {
  return (
    <Router>
      <Button as={Link} to={'http://localhost:5000/api/v1/auth/login-google'} className="m-4" variant="primary">Login with Google</Button>
      {/* <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
      </Router> */}
    </Router>
  );
}

export default App;
