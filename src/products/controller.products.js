const { Router } = require("express");

const { ProductManager } = require("../dao/Product.dao");
const productManager = new ProductManager();
const FilesDao = require("../dao/files.dao");
const filesDao = new FilesDao("products.json");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { category, stock, limit = 10, page = 1, sort } = req.query;
    const linkMold = `${req.protocol}://${req.get("host")}/api/products/`;
    const filter = {};

    if (category) {
      filter.category = { $regex: category };
    }

    if (stock) {
      filter.stock = { $gte: stock };
    }

    const conditionsQuery = {
      page,
      limit,
      sort: { price: sort === "desc" ? -1 : 1 },
    };

    const products = await productManager.getProducts(filter, conditionsQuery);
    const prevSort = sort === "desc" ? "asc" : "desc";
    const prevLink = products.hasPrevPage
      ? `${linkMold}?page=${products.prevPage}&limit=${limit}&sort=${prevSort}`
      : null;
    const nextLink = products.hasNextPage
      ? `${linkMold}?page=${products.nextPage}&limit=${limit}&sort=${sort}`
      : null;

    const respuestaInfo = {
      status: "success",
      playload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink,
      nextLink,
      linkMold,
    };

    const { user } = req.session;
      // res.status(200).render('products', { respuestaInfo, user });
    res.status(200).json(respuestaInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found'});
    }
    res.render("productID", product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !status ||
      !category
    ) {
      return res
        .status(400)
        .json({ mesagge: "Product with missing information" });
    }

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    const createdProduct = await productManager.addProduct(newProduct);
    res.json({ mesagge: createdProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
      const productId = req.params.id;
      const {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      } = req.body;
    
      const newUpdatedProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category,
      };
    
      const verifyExistenceUndefined =
        Object.values(newUpdatedProduct).indexOf(undefined);
    
      if (verifyExistenceUndefined === -1) {
        const UpdatedProduct = await productManager.updateProduct(
          productId,
          newUpdatedProduct
        );
        const products = await productManager.getProducts();
        res.json({ mesagge: UpdatedProduct });
      } else {
        res.status(406).json({ mesagge: "Product with missing information" });
      }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await productManager.deleteById(productId);
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.post("/json", async (req, res) => {
  try {
    const pJson = await filesDao.loadItems();
    const response = await productManager.addProductsToDB(pJson);
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
