import React, { useState, useEffect } from 'react';

function Carrinho() {
  // Estado para armazenar os produtos disponíveis e o carrinho
  const [products] = useState([
    { id: 1, name: 'Produto 1', price: 50 },
    { id: 2, name: 'Produto 2', price: 100 },
    { id: 3, name: 'Produto 3', price: 150 }
  ]);

  const [cart, setCart] = useState([]);

  // Recuperando o carrinho do localStorage ao carregar a página
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Salvando o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Função para remover um produto do carrinho
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Função para calcular o total do carrinho
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Função para gerar a mensagem do WhatsApp
  const sendWhatsAppMessage = () => {
    const total = getTotal();
    const itemsList = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
    const message = encodeURIComponent(`Olá! Meu pedido consiste em: ${itemsList}. O valor total do seu carrinho é: R$${total}`);
    const phoneNumber = '558187133707'; // Substitua pelo número desejado
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div>
      <h1>Loja</h1>
      <h2>Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R${product.price}
            <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>

      <h2>Carrinho</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - R${item.price} x {item.quantity}
            <button onClick={() => removeFromCart(item.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Total: R${getTotal()}</h3>
      <button onClick={sendWhatsAppMessage}>Entrar em contato</button>
    </div>
  );
}

export default Carrinho;
