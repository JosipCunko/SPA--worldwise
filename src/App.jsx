import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

//Before dynamic imports
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

/*
  Alows compoents to wait for smth to happen
  Suspended while loading - loading spinner
  Load pages as we need them - split our bundle to superete chunks
*/
const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
/*
//Before lazy
  dist/index.html                   0.48 kB │ gzip:   0.32 kB
  dist/assets/index-7be54289.css   30.46 kB │ gzip:   5.11 kB
  dist/assets/index-dab4d8aa.js   507.25 kB │ gzip: 148.22 kB
  
//After lazy
dist/index.html                           0.48 kB │ gzip:   0.32 kB
dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
dist/assets/Homepage-b9276e6f.css         0.51 kB │ gzip:   0.30 kB
dist/assets/PageNav-f4d00f31.css          0.51 kB │ gzip:   0.28 kB
dist/assets/AppLayout-c49eff02.css        1.91 kB │ gzip:   0.70 kB
dist/assets/index-0be8b119.css           26.79 kB │ gzip:   4.40 kB
dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
dist/assets/PageNotFound-5619549c.js      0.15 kB │ gzip:   0.15 kB
dist/assets/Logo-ecba00bf.js              0.21 kB │ gzip:   0.19 kB
dist/assets/PageNav-526dbd89.js           0.49 kB │ gzip:   0.27 kB
dist/assets/Pricing-3e5cff2a.js           0.65 kB │ gzip:   0.41 kB
dist/assets/Homepage-2ff7cebc.js          0.67 kB │ gzip:   0.41 kB
dist/assets/Product-58b59907.js           0.86 kB │ gzip:   0.48 kB
dist/assets/Login-23237ed7.js             1.01 kB │ gzip:   0.54 kB
dist/assets/AppLayout-a42e686b.js       156.93 kB │ gzip:  46.21 kB
dist/assets/index-1b5250c1.js           348.77 kB │ gzip: 101.46 kB
*/

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          {/*Load spinner when downloading a page */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/*Default - when path is nothing*/}
              <Route index element={<Homepage />} />

              <Route path="products" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/*Renders child based on route path */}

                {/*Re-direct */}
                <Route index element={<Navigate replace to="cities" />} />

                <Route path="cities" element={<CityList />} />

                {/*:id  => name of the part of the URL which will useParams use */}
                <Route path="cities/:id" element={<City />} />

                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
