
import CategoryDetailsScreen from "@/features/Categories/Screens/CategoryDetails.screen";

interface Props {
    params: {
        id: string;
    };
}

export default async function CategoryDetailPage({ params }: Props) {

    const {id} = await params

    return (
        <>
            <CategoryDetailsScreen id={id}/>
        </>
    );
}

