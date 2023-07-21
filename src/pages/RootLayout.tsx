import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import HeroImage from "../components/HeroImage";

function RootLayout() {
    return (
        <>
            <Nav />
            <HeroImage imageUrl="https://asianinspirations.com.au/wp-content/uploads/2019/07/Chinese-Cooking-Hacks.jpg">
                <Outlet />
            </HeroImage>
        </>
    );
};

export default RootLayout;