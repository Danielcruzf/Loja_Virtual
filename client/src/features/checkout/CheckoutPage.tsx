import { Grid, Typography } from "@mui/material";
import OrderSummary from "../../app/shared/componets/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchBasketQuery } from "../basket/basketApi";
import { useMemo } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK); // Carrega a chave pública do Stripe

// Página de checkout que renderiza o CheckoutStepper e OrderSummary
export default function CheckoutPage() {
  const { data: basket } = useFetchBasketQuery(); // Obtém os dados do carrinho de compras

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) {
      return undefined; // Retorna undefined se o clientSecret não estiver disponível
    }

    return {
      clientSecret: basket?.clientSecret, // Passa o clientSecret do carrinho para as opções do Stripe
    };
  }, [basket?.clientSecret]);

  // Renderiza a página de checkout com o CheckoutStepper e OrderSummary
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options ? (
          <Typography variant="h6">Loading checkout...</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}
