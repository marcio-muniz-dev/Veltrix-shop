
import { Suspense } from "react";
import { connection } from "next/server";
import { stripe } from "@/src/lib/stripe";
import Stripe from "stripe";
import Success from "./success";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra efetuada | Veltrix Shop",
  robots: {
    index: false,
    follow: false,
  },
};

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

async function SuccessDetails({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

 if (!session_id) {
  redirect("/");
}

  await connection();

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name ?? "Cliente";

  const lineItem = session.line_items?.data[0];
  const productData = lineItem?.price?.product;

  if (!productData || typeof productData === "string") {
    throw new Error("Produto não encontrado na sessão.");
  }

  const product = productData as Stripe.Product;

  if (!product.images[0]) {
    throw new Error("Imagem do produto não encontrada.");
  }

  return (
    <Success
      customerName={customerName}
      product={{
        name: product.name,
        imageUrl: product.images[0],
      }}
    />
  );
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  return (
    <Suspense fallback={<p>Carregando confirmação da compra...</p>}>
      <SuccessDetails searchParams={searchParams} />
    </Suspense>
  );
}
