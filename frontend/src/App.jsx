import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import LoginPage from "./components/adminDashboard/LoginPage";
import PendingTestimonials from "./components/adminDashboard/PendingTestimonials";
import { RequireAuth } from "./components/adminDashboard/RequireAuth";
import { AuthProvider } from "./components/context/AuthContext";
import { TestimonialProvider } from "./components/context/TestimonialContext";
import TestimonialForm from "./components/testimonialDashboard/TestimonialForm"
import TestimonialShowPage from "./components/testimonialDashboard/TestimonialShowPage"
import TestimonialsShowcase from "./components/testimonialDashboard/TestimonialsShowcase"
import TestimonialStepper from "./components/testimonialDashboard/TestimonialStepper"
import {BrowserRouter , Routes , Route} from "react-router-dom";

function App() {

  return (
    <>
    <AuthProvider>
    <TestimonialProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TestimonialsShowcase/>}/>
      <Route path="/testimonials/:id" element={<TestimonialShowPage/>}/>
      <Route path="/testimonialForm" element={<TestimonialStepper/>}/>
      <Route path="/admin/login" element={<LoginPage/>}/>
      <Route path="/admin" element={
        <RequireAuth>
        <AdminDashboard/>
        </RequireAuth>
      }/>
      <Route path="/admin/pending" element={<PendingTestimonials/>}/>
    </Routes>
    </BrowserRouter>
    </TestimonialProvider>
    </AuthProvider>
    </>
  )
}

export default App
