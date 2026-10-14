import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import OutfitDetailPage from './pages/OutfitDetailPage'
import BookingCheckoutPage from './pages/BookingCheckoutPage'
import ListOutfitPage from './pages/ListOutfitPage'
import FindMyLookPage from './pages/FindMyLookPage'
import MemberProfilePage from './pages/MemberProfilePage'
import WardrobeDashboardPage from './pages/WardrobeDashboardPage'
import WishlistPage from './pages/WishlistPage'
import RentVsBuyPage from './pages/RentVsBuyPage'
import TrustSafetyPage from './pages/TrustSafetyPage'
import AdminConsolePage from './pages/AdminConsolePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/outfit/:id" element={<OutfitDetailPage />} />
              <Route path="/checkout/:id" element={<BookingCheckoutPage />} />
              <Route path="/list-outfit" element={<ListOutfitPage />} />
              <Route path="/find-my-look" element={<FindMyLookPage />} />
              <Route path="/profile" element={<MemberProfilePage />} />
              <Route path="/my-wardrobe" element={<WardrobeDashboardPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/rent-vs-buy" element={<RentVsBuyPage />} />
              <Route path="/trust-safety" element={<TrustSafetyPage />} />
              <Route path="/admin" element={<AdminConsolePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
