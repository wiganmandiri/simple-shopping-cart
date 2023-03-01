import Product from "../pages/product";
import ShoppingCart from "../pages/shopping-chart";

export const routers = {
    landing : [
      {
        title: "Product",
        path: "",
        component: Product
      },
      {
        title: "Shopping Cart",
        path: "/cart",
        component: ShoppingCart
      }
    ],
    private : []
  }