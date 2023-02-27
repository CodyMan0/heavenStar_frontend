import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/homePage";
import ProfilePage from "scenes/homePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LoginPage />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/profile/:userId",
		element: <ProfilePage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
