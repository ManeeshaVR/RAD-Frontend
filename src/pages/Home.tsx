import TrendingCard from "../components/TrendingCard.tsx";
import CategoryCard from "../components/CategoryCard.tsx";
import {BsSunglasses} from "react-icons/bs";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {trendingService} from "../services/apiServices.ts";
import {useToast} from "../context/ToastContext.tsx";
import {Product} from "../interfaces/user.ts";
import {GiConverseShoe} from "react-icons/gi";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {showToast} = useToast();

    useEffect(() => {
        const getTrendingProducts = async () => {
            const res = await trendingService();
            if (res.success){
                setProducts(res.body as Product[])
            } else {
                showToast({ type: "error", message: res.message})
            }
        }
        getTrendingProducts();
    }, [showToast]);

    return (
        <div className='px-6 pt-12 md:px-24'>
            <section className="container py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg lg:ml-12">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                                Best place to choose <br/> your
                                <span className="text-primary ml-2">
                                    SHOES <GiConverseShoe  className='inline text-primary' size={64}/>
                                </span>
                            </h1>
                            <p className="mt-3 text-gray-600 dark:text-gray-400">
                                Buy the best high-quality sunglasses from us. More than 100 types of assortment.
                            </p>
                            <Link to='/products' className="btn btn-primary mt-6">Shop Now</Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full lg:max-w-3xl" alt='hero image' src='/hero_image.png'/>
                    </div>
                </div>
            </section>
            <section className='mb-8'>
                <h2 className='text-2xl font-bold'>Trending Products</h2>
                <div className='flex flex-wrap'>
                    {products.map((product, index) => (
                        <TrendingCard key={index} data={product} />
                    ))}
                </div>
            </section>
            <section>
                <h2 className='text-2xl font-bold'>Categories</h2>
                <div className='flex-row lg:flex justify-around items-center my-8'>
                    <CategoryCard title='Casual Shoe' image='/casual-shoe.jpg'/>
                    <CategoryCard title='High Heels' image='/heel.jpg'/>
                    <CategoryCard title='Sport Shoe' image='/sports-shoe.jpg'/>
                </div>
            </section>
        </div>
    )
}

export default Home;
