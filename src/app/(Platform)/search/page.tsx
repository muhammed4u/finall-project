import { getAllBrands } from "@/features/Brands/server/brands.action";
import { getAllCategories } from "@/features/Categories/Servers/Categories.action";
import SearchPage from "@/features/Search/screen/SearchPage";

export default async function Searchpage() {

    const categoriesData = await getAllCategories();
    const brandsData = await getAllBrands();
    return (
        <>
            <SearchPage categories={categoriesData.data} brands={brandsData.data}/>
            
        </>
    )
}
