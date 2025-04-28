const products = [
  { name: 'produto1', price: 100 },
  { name: 'product 2', price: 200 },
  { name: 'product 3', price: 300 },
]
function App() {

  return (
    <div>
      <h1>ReStore</h1>
      <ul>
        {products.map((item, index)=> (
          <li key={index}>{item.name} - {item.price}</li>))}
      </ul>

    </div>
  )
}

export default App
// todos os itens devem ter uma chave(key) unica evitando assim o erro de duplicidade
// o key deve ser unico para cada item da lista, se o mesmo item for renderizado mais de uma vez, o mesmo key pode ser utilizado

