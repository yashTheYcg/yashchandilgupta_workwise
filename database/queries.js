const signup = "INSERT INTO users (userid,email,password,type) VALUES ($1, $2, $3, $4)";
const checkEmailExist = "SELECT * FROM users u where u.email=$1";
const userExistSeller = "SELECT * FROM users u where u.userid=$1 AND u.type='seller'";
const userExist = "SELECT * FROM users u where u.userid=$1";
const addProduct = "INSERT INTO product (productid,name,category,description,price,discount,sellerid) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const editProduct = " UPDATE product SET name = COALESCE($1, name),category = COALESCE($2, category),description = COALESCE($3, description), price = COALESCE($4, price), discount = COALESCE($5, discount) WHERE productid=$6 AND sellerid=$7";
const checkProduct = "SELECT * FROM product p where p.productid=$1 AND p.sellerid=$2";
const deleteProduct = "DELETE FROM product WHERE productid = $1";
const searchProduct = "SELECT * FROM product WHERE 1=1";
const checkExistCart = "SELECT * FROM cart WHERE buyerid = $1";
const createCart = "INSERT INTO cart (buyerid) VALUES ($1) RETURNING *";
const addProductToCart = " INSERT INTO cartitem (cartid, productid, quantity) VALUES ($1, $2, $3) ON CONFLICT (cartid, productid) DO UPDATE SET quantity = cartitem.quantity + EXCLUDED.quantity";
const removeProductFromCart = `
            DELETE FROM cartitem
            WHERE cartid = (SELECT cartid FROM cart WHERE buyerid = $1) 
            AND productid = $2
            `

module.exports = {
    signup,
    checkEmailExist,
    userExistSeller,
    userExist,
    addProduct,
    editProduct,
    checkProduct,
    deleteProduct,
    searchProduct,
    checkExistCart,
    createCart,
    addProductToCart,
    removeProductFromCart
}