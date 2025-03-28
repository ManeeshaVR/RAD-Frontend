import ProductCard from "../components/ProductCard.tsx";
import {useEffect, useState} from "react";
import {useToast} from "../context/ToastContext.tsx";
import {productsService} from "../services/apiServices.ts";
import {FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";
import {Product} from "../interfaces/user.ts";
import {PaginatedProductResponse} from "../interfaces/api.ts";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {showToast} = useToast();

    const getProducts = async () => {
        const res = await productsService(currentPage);
        if (res.success && (res.body as PaginatedProductResponse).docs && (res.body as PaginatedProductResponse).totalPages){
            setProducts((res.body as PaginatedProductResponse).docs);
            setTotalPages((res.body as PaginatedProductResponse).totalPages);
        } else {
            showToast({ type: "error", message: res.message})
        }
    }

    useEffect(() => {
        getProducts();
    }, [currentPage, showToast]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className='px-6 md:px-24 pt-28'>
            <img
                src='/shoes_banner.jpg'
                alt='bannerImg'
                className='rounded-2xl h-full min-h-[10rem] object-cover'
            />
            <section>
                <h2 className='text-3xl mt-8'>Glasses for you!</h2>
                <div className='flex flex-wrap justify-center my-8'>
                    {products.map((product, index) => (
                        <ProductCard key={index} data={product}/>
                    ))}
                </div>
                <div className='flex justify-center items-center mb-8'>
                    <div className="join">
                        <button className='join-item btn' onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}>
                            <FaAnglesLeft />
                        </button>
                        {/*<span className='join-item btn '>{currentPage} of {totalPages}</span>*/}
                        {(() => {
                            const buttons = [];
                            for (let i = 1; i <= totalPages; i++) {
                                buttons.push(
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i)}
                                        className={`join-item btn ${currentPage === i ? 'btn-primary' : ''}`}
                                    >
                                        {i}
                                    </button>
                                );
                            }
                            return buttons;
                        })()}
                        <button className='join-item btn' onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}>
                            <FaAnglesRight />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Products;
