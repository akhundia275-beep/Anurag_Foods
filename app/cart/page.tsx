"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PackageCheck, ShoppingBag, Trash2 } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { ProductImage } from "@/components/product-image";
import { formatRupees, getBillTotals, minimumOrderValue } from "@/lib/billing";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const bill = getBillTotals(items);
  const canCheckout = bill.remainingMinimumValue === 0;
  const progress = Math.min(100, (bill.subtotal / minimumOrderValue) * 100);

  if (items.length === 0) {
    return (
      <section className="container-pad grid min-h-[60vh] place-items-center py-14 text-center">
        <div className="glass max-w-lg rounded-lg p-8">
          <h1 className="text-4xl font-black text-tealInk">Your cart is empty</h1>
          <p className="mt-3 text-tealInk/70">Add frozen food products to begin a retail, bulk or distributor order.</p>
          <LinkButton href="/products" variant="orange" className="mt-6">
            Browse products
          </LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="container-pad py-12 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-saffron">Your order</p>
          <h1 className="mt-2 text-4xl font-black text-tealInk md:text-6xl">Cart</h1>
        </div>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-black text-tealInk shadow-sm transition hover:text-saffron">
          <ShoppingBag className="h-4 w-4" />
          Add products
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <motion.div layout className="grid gap-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: -28, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="cart-item grid gap-4 rounded-[18px] bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr] md:grid-cols-[132px_1fr_auto] md:items-center"
              >
                <Link href={`/products/${item.product.slug}`} className="relative aspect-square overflow-hidden rounded-[16px] bg-[#fff4ea]">
                  <ProductImage product={item.product} />
                </Link>

                <div className="min-w-0">
                  <Link href={`/products/${item.product.slug}`} className="text-xl font-black text-tealInk hover:text-saffron">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-sm font-semibold text-tealInk/60">
                    {item.product.weight} | {formatPrice(item.product)}
                  </p>
                  <p className="mt-2 text-sm font-black text-tealInk">
                    Line total: Rs {(item.product.price * item.quantity).toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:justify-self-end">
                  <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-tealInk/50">
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.product.id, Math.max(1, Number(event.target.value) || 1))}
                      className="h-12 w-28 rounded-lg border border-tealDeep/15 px-4 text-base font-black text-tealInk"
                    />
                  </label>
                  <motion.button
                    whileTap={{ scale: 0.86, rotate: -8 }}
                    onClick={() => removeItem(item.product.id)}
                    className="mt-5 rounded-lg bg-red-50 p-3 text-red-600"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.aside layout className="h-fit rounded-[18px] bg-tealDeep p-6 text-white shadow-soft">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-saffron text-white">
              <PackageCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">Order total</p>
              <p className="text-xs font-bold text-white/50">Minimum subtotal: Rs 8,000</p>
            </div>
          </div>

          <p className="mt-4 text-4xl font-black">{formatRupees(bill.grandTotal)}</p>
          <div className="mt-5 rounded-lg bg-white/10 p-4">
            <div className="flex items-center justify-between gap-4 text-sm font-bold">
              <span>Cart value</span>
              <span>
                {formatRupees(bill.subtotal)} / {formatRupees(minimumOrderValue)}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
              <motion.div initial={false} animate={{ width: `${progress}%` }} className="h-full rounded-full bg-saffron" />
            </div>
            {canCheckout ? (
              <p className="mt-3 text-sm font-bold text-leaf">MOQ complete. You can checkout now.</p>
            ) : (
              <p className="mt-3 text-sm font-bold text-white/75">
                Add {formatRupees(bill.remainingMinimumValue)} more to unlock checkout.
              </p>
            )}
          </div>

          <div className="mt-5 grid gap-2 rounded-lg bg-white/10 p-4 text-sm font-bold">
            <div className="flex justify-between gap-3 text-white/75">
              <span>Subtotal</span>
              <span>{formatRupees(bill.subtotal)}</span>
            </div>
            <div className="flex justify-between gap-3 text-white/75">
              <span>GST 18%</span>
              <span>{formatRupees(bill.gst)}</span>
            </div>
            <div className="flex justify-between gap-3 text-white/75">
              <span>Delivery</span>
              <span>{formatRupees(bill.delivery)}</span>
            </div>
            <div className="flex justify-between gap-3 border-t border-white/15 pt-2 text-white">
              <span>Bill total</span>
              <span>{formatRupees(bill.grandTotal)}</span>
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-white/70">Final order approval happens after manual UPI proof and UTR verification.</p>
          {canCheckout ? (
            <LinkButton href="/checkout" variant="orange" className="mt-6 w-full">
              Checkout
            </LinkButton>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="mt-6 inline-flex w-full cursor-not-allowed items-center justify-center rounded-md bg-white/15 px-5 py-3 text-sm font-bold text-white/45"
              >
                Checkout locked
              </button>
              <LinkButton href="/products" variant="orange" className="mt-3 w-full">
                Add more products
              </LinkButton>
            </>
          )}
          <Button variant="ghost" className="mt-3 w-full" onClick={() => window.history.back()}>
            Continue shopping
          </Button>
        </motion.aside>
      </div>
    </section>
  );
}
