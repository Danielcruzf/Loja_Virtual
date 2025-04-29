import { useEffect, useState } from "react"
import { Product } from "../models/product"; // importando o tipo Product do arquivo product.ts
function App() {
  const [products, setProducts] = useState<Product []>([]);// o useEffect é um hook que permite executar efeitos colaterais em componentes funcionais
  useEffect(() => {
    fetch('https://localhost:5001/api/product')
      .then((response) => response.json())
      .then((data) => setProducts(data));
      
  }, []);
    
  // o useState é um hook que permite adicionar estado a um componente funcional
  // o useState retorna um array com dois elementos, o primeiro é o estado atual e o segundo é uma função para atualizar o estado.
  const addProduct =() => {setProducts(prevState=>[...prevState, { 
    id: prevState.length+1,
    name: 'product '+(prevState.length+1), 
    price:(prevState.length*100)+100,quantityInStock: 100,
    description: 'teste',
    pictureUrl: 'https://picsum.photo/200',
    type: 'teste',
    brand: 'teste'

  }])}

  return (
    <div>
      <h1>ReStore</h1>
      <ul>
        {products.map((item, index)=> (
          <li key={index}>{item.name} - {item.price}</li>))}
      </ul>
      <button onClick={addProduct}>Adicionar produto</button>

    </div>
  )
}

export default App
// todos os itens devem ter uma chave(key) unica evitando assim o erro de duplicidade
// o key deve ser unico para cada item da lista, se o mesmo item for renderizado mais de uma vez, o mesmo key pode ser utilizado

