import TrendingCard from "../components/TrendingCard.tsx";
import CategoryCard from "../components/CategoryCard.tsx";
import { BsSunglasses } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { trendingService } from "../services/apiServices.ts";
import { useToast } from "../context/ToastContext.tsx";
import { Product } from "../interfaces/user.ts";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { showToast } = useToast();

    useEffect(() => {
        const getTrendingProducts = async () => {
            const res = await trendingService();
            if (res.success) {
                setProducts(res.body as Product[]);
            } else {
                showToast({ type: "error", message: res.message });
            }
        };
        getTrendingProducts();
    }, [showToast]);

    return (
        <div className='px-6 pt-12 md:px-24'>
            {/* Hero Section */}
            <section className="container mx-auto text-center py-20 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white leading-tight">
                    Discover the Perfect
                    <span className="text-primary ml-2">SPECS</span>
                </h1>
                <BsSunglasses className='text-primary my-4' size={72} />
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                    Explore our collection of high-quality sunglasses with over 100 different styles to choose from.
                </p>
                <Link to='/products' className="btn btn-primary mt-6">Shop Now</Link>
            </section>

            {/* Trending Products Section */}
            <section className='mb-12'>
                <h2 className='text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6'>Trending Products</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {products.map((product, index) => (
                        <TrendingCard key={index} data={product} />
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section>
                <h2 className='text-3xl font-semibold text-gray-900 dark:text-white text-center mb-6'>Categories</h2>
                <div className='flex gap-4 overflow-x-auto pb-4'>
                    <CategoryCard title='Prescription' image='/prescription_glasses.jpg' />
                    <CategoryCard title='Sunglasses' image='/sunglasses.jpg' />
                    <CategoryCard title='Sport' image='/sport.jpg' />
                </div>
            </section>
        </div>
    );
};

export default Home;
