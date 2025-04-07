import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./RootLayout";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import CreatePostPage from "./pages/CreatePostPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import CategoryPage from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import UsersTable from "./components/UsersTable";
import PostsTable from "./components/PostsTable";
import CategoriesTable from "./components/CategoriesTable";
import CommentsTable from "./components/CommentsTable";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useSelector } from "react-redux";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  const user = useSelector((state) => state.auth.user?.userWithoutPassword);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="posts">
            <Route index element={<PostsPage />} />
            <Route
              path="create-post"
              element={user ? <CreatePostPage /> : <Navigate to={"/"} />}
            />
            <Route path="details/:id" element={<PostDetailsPage />} />
            <Route path="categories/:category" element={<CategoryPage />} />
          </Route>

          <Route path="admin-dashboard">
            <Route
              index
              element={
                user?.isAdmin ? <AdminDashboardPage /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="users-table"
              element={user?.isAdmin ? <UsersTable /> : <Navigate to={"/"} />}
            />
            <Route
              path="posts-table"
              element={user?.isAdmin ? <PostsTable /> : <Navigate to={"/"} />}
            />
            <Route
              path="categories-table"
              element={
                user?.isAdmin ? <CategoriesTable /> : <Navigate to={"/"} />
              }
            />
            <Route
              path="comments-table"
              element={
                user?.isAdmin ? <CommentsTable /> : <Navigate to={"/"} />
              }
            />
          </Route>

          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!user ? <RegisterPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/users/:userId/verify/:token"
            element={!user ? <VerifyEmailPage /> : <Navigate to={"/"} />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPasswordPage />} />

          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
