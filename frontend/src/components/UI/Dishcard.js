import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCartContext } from "../../context/CartContext";
import { ButtonGroup } from "@mui/material";

export default function Dishcard({
  dish: { name, price, description, photo, category, _id },
  addToCart,
}) {
  var b64 = btoa(
    new Uint8Array(photo?.data?.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const { cartItems, getItemQuantity, setItems, decreaseItem } =
    useCartContext();

  return (
    <Card sx={{ maxWidth: 345 }}>
      {console.log("context working", cartItems)}
      <CardMedia
        component="img"
        height="140"
        src={`data:image/jpeg;base64,${b64}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
          {category._id}
        </Typography>
        <Typography>{price}</Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        {getItemQuantity(_id) == 0 ? (
          <Button size="small" onClick={() => setItems(_id)}>
            Add to cart
          </Button>
        ) : (
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={() => decreaseItem(_id)}>-</Button>
            <Typography>{getItemQuantity(_id)}</Typography>
            <Button onClick={() => setItems(_id)}>+</Button>
          </ButtonGroup>
        )}
      </CardActions>
    </Card>
  );
}
