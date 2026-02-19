/**
 * DESIGN: "Arquitetura de Negócios" — Corporate Dark Premium
 * Módulo Marketplace: catálogo, carrinho funcional e checkout simulado
 * Demonstração interativa das capacidades de Pedro Andreoli
 */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, X, Plus, Minus, Search, Filter, Star,
  ArrowLeft, Package, CreditCard, CheckCircle, ChevronRight,
  Zap, Shield, Truck
} from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1, name: "Notebook Pro Ultra", price: 4299.90, originalPrice: 5199.90,
    category: "Eletrônicos", rating: 4.8, reviews: 234,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    badge: "Mais Vendido", description: "Intel Core i7, 16GB RAM, SSD 512GB"
  },
  {
    id: 2, name: "Smartphone X15 Pro", price: 2899.00, originalPrice: 3499.00,
    category: "Smartphones", rating: 4.9, reviews: 512,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80",
    badge: "Novo", description: "6.7\" AMOLED, 256GB, Câmera 200MP"
  },
  {
    id: 3, name: "Fone Bluetooth Elite", price: 599.90, originalPrice: 799.90,
    category: "Áudio", rating: 4.7, reviews: 189,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "Oferta", description: "ANC, 40h bateria, Hi-Res Audio"
  },
  {
    id: 4, name: "Smartwatch Series 8", price: 1299.00,
    category: "Wearables", rating: 4.6, reviews: 98,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    description: "GPS, monitor cardíaco, 18h bateria"
  },
  {
    id: 5, name: "Câmera Mirrorless 4K", price: 6799.00, originalPrice: 7999.00,
    category: "Fotografia", rating: 4.9, reviews: 67,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
    badge: "Premium", description: "24MP, 4K 60fps, Wi-Fi, Bluetooth"
  },
  {
    id: 6, name: "Teclado Mecânico RGB", price: 349.90,
    category: "Periféricos", rating: 4.5, reviews: 321,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80",
    description: "Switch Red, RGB per-key, ABNT2"
  },
  {
    id: 7, name: "Monitor 4K 27\"", price: 1899.00, originalPrice: 2299.00,
    category: "Monitores", rating: 4.7, reviews: 145,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80",
    badge: "Oferta", description: "IPS, 144Hz, HDR400, USB-C"
  },
  {
    id: 8, name: "SSD NVMe 1TB", price: 399.90, originalPrice: 499.90,
    category: "Armazenamento", rating: 4.8, reviews: 278,
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
    description: "7000MB/s leitura, PCIe 4.0, 5 anos garantia"
  },
];

const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

type CheckoutStep = "cart" | "address" | "payment" | "success";

export default function MarketplacePage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} adicionado ao carrinho!`, {
      description: `R$ ${product.price.toFixed(2).replace(".", ",")}`,
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
    setCheckoutStep("cart");
  };

  const handleNextStep = () => {
    if (checkoutStep === "cart") setCheckoutStep("address");
    else if (checkoutStep === "address") setCheckoutStep("payment");
    else if (checkoutStep === "payment") {
      setCheckoutStep("success");
      setCart([]);
    }
  };

  const formatPrice = (price: number) =>
    `R$ ${price.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <div className="pt-16">
        <div className="container py-8">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Voltar ao Portfólio
              </span>
            </Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-sm text-primary font-medium">Marketplace Demo</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">
                Módulo <span className="gradient-text">Marketplace</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Demonstração funcional — catálogo, carrinho e checkout simulado
              </p>
            </div>
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container pb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group bg-card border border-border rounded-xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-secondary">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-bold rounded-full ${
                    product.badge === "Mais Vendido" ? "bg-accent text-accent-foreground" :
                    product.badge === "Novo" ? "bg-primary text-primary-foreground" :
                    product.badge === "Oferta" ? "bg-red-500 text-white" :
                    "bg-purple-500 text-white"
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground font-mono mb-1">{product.category}</p>
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-accent fill-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-lg font-extrabold text-foreground">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/10 border border-primary/30 text-primary text-sm font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Adicionar
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h2 className="font-bold text-foreground">Carrinho</h2>
                  {cartCount > 0 && (
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-bold rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">Seu carrinho está vazio</p>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="mt-4 text-primary text-sm font-medium hover:underline"
                    >
                      Continuar comprando
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-secondary/40 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-secondary flex items-center justify-center hover:bg-border transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-muted-foreground hover:text-destructive transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-foreground text-lg">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-3.5 h-3.5 text-green-400" />
                    <span>Frete grátis para compras acima de R$ 299</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    Finalizar Compra
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={(e) => { if (e.target === e.currentTarget && checkoutStep !== "success") setCheckoutOpen(false); }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden"
              >
                {checkoutStep !== "success" && (
                  <div className="flex items-center justify-between p-5 border-b border-border">
                    <div className="flex items-center gap-3">
                      {["cart", "address", "payment"].map((step, i) => (
                        <div key={step} className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            checkoutStep === step ? "bg-primary text-primary-foreground" :
                            ["cart", "address", "payment"].indexOf(checkoutStep) > i
                              ? "bg-green-500 text-white" : "bg-secondary text-muted-foreground"
                          }`}>
                            {["cart", "address", "payment"].indexOf(checkoutStep) > i ? "✓" : i + 1}
                          </div>
                          {i < 2 && <div className={`w-8 h-px ${["cart", "address", "payment"].indexOf(checkoutStep) > i ? "bg-green-500" : "bg-border"}`} />}
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setCheckoutOpen(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                <div className="p-6">
                  {checkoutStep === "cart" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-foreground text-lg">Resumo do Pedido</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                            <span className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(cartTotal)}</span>
                      </div>
                    </div>
                  )}

                  {checkoutStep === "address" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-foreground text-lg">Endereço de Entrega</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {["Nome completo", "CPF", "CEP", "Endereço", "Número", "Complemento", "Cidade", "Estado"].map(field => (
                          <div key={field} className={field === "Endereço" || field === "Nome completo" ? "col-span-2" : ""}>
                            <label className="text-xs text-muted-foreground mb-1 block">{field}</label>
                            <input
                              type="text"
                              placeholder={field}
                              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {checkoutStep === "payment" && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-foreground text-lg">Pagamento</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {["Cartão de Crédito", "PIX", "Boleto"].map((method, i) => (
                          <button
                            key={method}
                            className={`p-3 rounded-lg border text-xs font-medium text-center transition-all ${
                              i === 0 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            {method}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {["Número do Cartão", "Nome no Cartão"].map(field => (
                          <div key={field}>
                            <label className="text-xs text-muted-foreground mb-1 block">{field}</label>
                            <input
                              type="text"
                              placeholder={field === "Número do Cartão" ? "0000 0000 0000 0000" : "Como no cartão"}
                              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                            />
                          </div>
                        ))}
                        <div className="grid grid-cols-2 gap-3">
                          {["Validade (MM/AA)", "CVV"].map(field => (
                            <div key={field}>
                              <label className="text-xs text-muted-foreground mb-1 block">{field}</label>
                              <input
                                type="text"
                                placeholder={field === "Validade (MM/AA)" ? "MM/AA" : "000"}
                                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="w-3.5 h-3.5 text-green-400" />
                        <span>Pagamento 100% seguro e criptografado</span>
                      </div>
                    </div>
                  )}

                  {checkoutStep === "success" && (
                    <div className="text-center py-8 space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mx-auto"
                      >
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-foreground">Pedido Confirmado!</h3>
                        <p className="text-muted-foreground text-sm mt-2">
                          Esta é uma demonstração. Em produção, o pedido seria processado e você receberia um e-mail de confirmação.
                        </p>
                      </div>
                      <div className="p-4 bg-secondary/40 rounded-xl text-sm text-muted-foreground">
                        <p className="font-mono text-xs text-primary mb-1">Módulo desenvolvido por Pedro Andreoli</p>
                        <p>Sistema completo com integração de pagamento, gestão de estoque e painel administrativo.</p>
                      </div>
                      <button
                        onClick={() => { setCheckoutOpen(false); setCheckoutStep("cart"); }}
                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
                      >
                        Voltar ao Marketplace
                      </button>
                    </div>
                  )}

                  {checkoutStep !== "success" && (
                    <button
                      onClick={handleNextStep}
                      className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
                    >
                      {checkoutStep === "payment" ? (
                        <><Zap className="w-4 h-4" /> Confirmar Pedido</>
                      ) : (
                        <>Continuar <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
