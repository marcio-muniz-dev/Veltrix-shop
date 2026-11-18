"use client";

import {
    ImageContainer,
    ProductContainer,
    ProductDetails,
} from "@/src/styles/pages/product";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string | null;
        defaultPriceId: string;
    };
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyButton() {
        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;
        } catch  {
            setIsCreatingCheckoutSession(false);

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image
                    src={product.imageUrl}
                    width={520}
                    height={480}
                    alt={product.name}
                />
            </ImageContainer>

            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    );
}