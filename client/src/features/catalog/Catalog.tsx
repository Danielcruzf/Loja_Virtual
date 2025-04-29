import { Product } from "../../app/models/product"

type Props = {
  products: Product[]
  addProduct: () => void;
}

export default function Catalog(props: Props) {
  return (
    <>
      <ul>
        {props.products.map((item => (
          <li key={item.id}>{item.name} - {item.price}</li>)))}
      </ ul>
      <button onClick={props.addProduct}>Adicionar produto</button>
    </>
  )
}
