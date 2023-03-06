const { Router } = require('express');

const router = Router();

const { CartManager } = require('../dao/Cart.Dao');
const cartManager = new CartManager()
const { ProductManager } = require('../dao/Product.dao');
const productManager = new ProductManager()


router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    console.log(carts)
    res.json(carts);
});

router.post('/', async (req, res) => {
    try {
        const createdCart = await cartManager.addCart({});
        res.json({ mesagge: createdCart });
    }
    catch (error) {
        res.status(500).json({ mesagge: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartManager.getCartById(cartId);
    console.log(getById);
    //res.status(200).json(getById);
    res.status(500).render('cart',getById);
});

router.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartManager.getCartById(cartId);

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if(verifyExistence){
         const updateCartProducts = await cartManager.postCartProductsId(cartId,productId,true);
         res.status(200).json({ mesagge: updateCartProducts });
        }

    else{
         const updateCartProducts = await cartManager.postCartProductsId(cartId,productId,false);
         res.status(200).json({ mesagge: updateCartProducts });
        } 
});

router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartManager.getCartById(cartId);
    const getProductById = await productManager.getProductById(productId);
    const productoTitulo = getProductById.title;

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if (verifyExistence === undefined) {
        res.status(404).json({ mesagge: 'not found' });
    }
    else {
        const productsArrayPosition = getCartById.products.findIndex(item => item.id === productId);
        getCartById.products.splice(productsArrayPosition, 1);
        let newArray = getCartById.products;
        const deleteCartProducts = await cartManager.deleteCartProductsId(cartId, newArray);
        res.status(200).json({ mesagge: deleteCartProducts });

    } 
});

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    const getById = await cartManager.deleteById(cartId);
    //console.log(cartId);
    res.status(200).json({ mesagge: getById });
});

router.put('/:cid/products/:pid', async (req, res) => {
    const { quantity } = req.body;
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const getCartById = await cartManager.getCartById(cartId);

    const verifyExistence = getCartById.products.find((e) => e.product == productId);

    if(verifyExistence){
         const updateCartProducts = await cartManager.updateCartProductsId(cartId, productId, true, quantity);
         res.status(200).json({ mesagge: "cart products updated" });
        }

    else{
         const updateCartProducts = await cartManager.updateCartProductsId(cartId, productId, false, quantity);
         res.status(200).json({ mesagge: "cart products updated" });
        }
});


//Ejemplo de body
// {
//     "products": [
//         {
//         "product": "63ed6ef62c4930c20f2e046e",
//         "quantity": 1
//     },
//     {
//         "product": "63ed6f052c4930c20f2e0472",
//         "quantity": 1
//     },
//     {
//         "product": "63ed6f672c4930c20f2e0490",
//         "quantity": 1
//     }
//     ]
// }
router.put('/:cid', async (req, res) => {
    const { products } = req.body;
    const cartId = req.params.cid;
    const getCartById = await cartManager.updateCartId(cartId, products);
    res.status(200).json( getCartById );
});

module.exports = router;