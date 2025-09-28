import { Container } from "@mui/material";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
import Register from "./pages/Register";

export default function App() {
    return <div>
        <Header />
        <AppDrawer />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Register />
        </Container>
    </div>;
}