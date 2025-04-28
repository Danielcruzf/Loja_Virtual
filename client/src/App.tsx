import { useState } from 'react'
function App() {
  const [products, setProducts] = useState([
    { name: 'product 1', price: 100 },
    { name: 'product 2', price: 200 },
    { name: 'product 3', price: 300 }
  ])
  // o useState é um hook que permite adicionar estado a um componente funcional
  // o useState retorna um array com dois elementos, o primeiro é o estado atual e o segundo é uma função para atualizar o estado.
  const addProduct =() => {setProducts(prevState=>[...prevState, { name: 'product '+(prevState.length+1), price:(prevState.length*100)+100}])}

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

