export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status().json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    console.log("Error in post products", error.message);
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  const newProduct = new ProductModel(product);
  try {
    await newProduct.save();
    res
      .status(200)
      .json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Create new Product failed" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Product Id" });
  }
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Delete" });
  } catch (error) {
    console.log("Error in delete products", error.message);
    res.status(400).json({ success: false, message: "Product Delete Error" });
  }
};
