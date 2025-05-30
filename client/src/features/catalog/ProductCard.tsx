import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAddBasketItemMutation } from "../basket/basketApi"; // Adicione este import

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    const [addBasketItem, { isLoading }] = useAddBasketItemMutation();
    return (
        <Card
            elevation={3}
            sx={{
                width: 280,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover' }} // Corrigido aqui
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                    variant="subtitle2"
                >
                    {product.name}
                </Typography>

                <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                    $ {(product.price / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button disabled={isLoading} onClick={() => addBasketItem({ product, quantity: 1 })}>
                    ADD TO CART
                </Button>
                <Button component={Link} to={`/catalog/${product.id}`}>
                    VIEW
                </Button>
            </CardActions>
        </Card>
    );
}