import ProductDetailsScreen from '../../../../features/Products/Screens/Product-details.screen';

type ProductDetailsProp = {
    params: Promise<{id:string}>
}

export default async function ProductDetailsPage({params}:ProductDetailsProp) {

const {id} = await params

    return (
        <>    
            <ProductDetailsScreen productId={id}/>  
        </>
    )
}