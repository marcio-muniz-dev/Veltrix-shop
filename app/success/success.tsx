
import {
  ImageContainer,
  SuccessContainer,
} from "@/src/styles/pages/success";
import Image from "next/image";
import Link from "next/link";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({
  customerName,
  product,
}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image
          src={product.imageUrl}
          width={120}
          height={110}
          alt={product.name}
          loading="eager"
        />
      </ImageContainer>

      <p>
        Uhuul <strong>{customerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  );
}
