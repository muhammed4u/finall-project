import DealsBanners from "../Components/DealsBanners";
import FeauturedProducts from "../Components/FeauturedProducts";
import Newsletter from "../Components/NewsLetter";
import OurCategories from "../Components/OurCategories";
import PromoBanner from "../Components/PromoBanner";
import Slider from "../Components/Slider";

export default function HomeScreens() {
    return (
        <>
            <Slider/>
            <PromoBanner/>
            <OurCategories/>
            <DealsBanners/>
            <FeauturedProducts/>
            <Newsletter/>
        </>
    )
}
