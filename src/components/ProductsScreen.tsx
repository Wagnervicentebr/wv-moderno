import React, { useState } from 'react';
import { ShoppingBag, Plus, X, Check } from 'lucide-react';
import { products, Product } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

export function ProductsScreen() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addItem, itemCount } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const formatPrice = (price: number) => {
    return 'R$ ' + price.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen pt-14 pb-20 md:pt-16 md:pb-8 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl mb-2">Produtos Premium</h1>
          <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))]">
            Produtos exclusivos usados no salão
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm font-medium flex-shrink-0 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-[rgb(var(--color-text-secondary))] hover:bg-gray-50'
              }`}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="card bg-white overflow-hidden cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div 
                className="card-image h-56 md:h-64 mb-4 bg-gradient-to-br from-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))] relative overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Indisponível</span>
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="text-xs text-[rgb(var(--color-text-secondary))] mb-2 uppercase tracking-wide">
                  {product.category}
                </div>
                <h3 
                  className="text-base md:text-lg mb-2 line-clamp-2 cursor-pointer hover:text-[rgb(var(--color-accent))] transition-colors"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg md:text-xl font-semibold">{formatPrice(product.price)}</div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="btn-primary text-xs md:text-sm py-2 px-3 md:px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 md:gap-2"
                  >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Detail Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-0 md:p-6 animate-fade-in">
            <div className="bg-white w-full md:max-w-4xl md:rounded-3xl rounded-t-3xl max-h-[95vh] overflow-y-auto animate-slide-up">
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-black/5 p-4 md:p-6 flex items-center justify-between z-10">
                <h2 className="text-lg md:text-2xl font-semibold">Detalhes do Produto</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors touch-manipulation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:p-8">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  {/* Product Image */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="card-image aspect-square overflow-hidden bg-gradient-to-br from-[rgb(var(--color-tertiary))] to-[rgb(var(--color-tertiary-dark))]">
                      <img
                        src={selectedProduct.images[currentImageIndex]}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Images Thumbnails */}
                    {selectedProduct.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {selectedProduct.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${selectedProduct.name} ${idx + 1}`}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 transition-all touch-manipulation ${
                              currentImageIndex === idx ? 'ring-2 ring-black' : 'opacity-50 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col">
                    <div className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] mb-2 uppercase tracking-wide">
                      {selectedProduct.category}
                    </div>
                    <h2 className="text-xl md:text-3xl mb-3 md:mb-4">{selectedProduct.name}</h2>
                    <div className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{formatPrice(selectedProduct.price)}</div>
                    
                    <p className="text-sm md:text-base text-[rgb(var(--color-text-secondary))] mb-6 md:mb-8 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    {/* Stock Status */}
                    <div className="mb-4 md:mb-6">
                      {selectedProduct.inStock ? (
                        <div className="flex items-center gap-2 text-xs md:text-sm text-green-600">
                          <Check className="w-4 h-4" />
                          <span>Produto disponível para entrega</span>
                        </div>
                      ) : (
                        <div className="text-xs md:text-sm text-red-600">
                          Produto temporariamente indisponível
                        </div>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {selectedProduct.inStock ? (
                      <button
                        onClick={() => {
                          handleAddToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="btn-primary w-full mb-4 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Adicionar ao carrinho
                      </button>
                    ) : (
                      <button
                        disabled
                        className="btn-primary w-full mb-4 opacity-50 cursor-not-allowed text-sm md:text-base"
                      >
                        Produto indisponível
                      </button>
                    )}

                    {/* Product Details */}
                    <div className="mt-auto pt-6 md:pt-8 border-t border-black/10 space-y-4 md:space-y-6">
                      <div>
                        <h4 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Detalhes</h4>
                        <ul className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))] space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-[rgb(var(--color-accent))]">•</span>
                            <span>Produto de uso profissional</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[rgb(var(--color-accent))]">•</span>
                            <span>Fórmula exclusiva e premium</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[rgb(var(--color-accent))]">•</span>
                            <span>Resultados visíveis</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-semibold mb-2 md:mb-3">Entrega</h4>
                        <p className="text-xs md:text-sm text-[rgb(var(--color-text-secondary))]">
                          Enviamos para todo o Brasil. Prazo estimado de 5-10 dias úteis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-96 z-50 animate-slide-up">
            <div className="card bg-black text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[rgb(var(--color-accent))]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-[rgb(var(--color-accent))]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-1">Adicionado ao carrinho</div>
                  <div className="text-sm text-white/70">{itemCount} {itemCount === 1 ? 'item' : 'itens'} no total</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}