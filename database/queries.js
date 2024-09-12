const signup = "INSERT INTO users (userid,email,password,type) VALUES ($1, $2, $3, $4)";
const checkEmailExist = "SELECT * FROM users u where u.email=$1";
const userExist = "SELECT * FROM users u where u.userid=$1 AND u.type='seller'";
const addProduct = "INSERT INTO product (productid,name,category,description,price,discount,sellerid) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const editProduct = " UPDATE product SET name = COALESCE($1, name),category = COALESCE($2, category),description = COALESCE($3, description), price = COALESCE($4, price), discount = COALESCE($5, discount) WHERE productid=$6 AND sellerid=$7";
const checkProduct = "SELECT * FROM product p where p.productid=$1 AND p.sellerid=$2";
const deleteProduct = "DELETE FROM product WHERE productid = $1"

module.exports = {
    signup,
    checkEmailExist,
    userExist,
    addProduct,
    editProduct,
    checkProduct,
    deleteProduct
}