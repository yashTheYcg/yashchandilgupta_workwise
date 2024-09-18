const uuid4 = require('uuid4');
const queries = require('../database/queries');
const {validationResult} = require('express-validator');
const pool = require('../database/db.connection');

// for adding the product
const addProduct = async (req,res)=> {

    // check whether the user is valid and seller or not 
    // then add the product

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id,type} = req.user;
        pool.query(queries.userExistSeller,[id],(error,result)=> {
            if (error) throw error;
            
            if(result.rows.length>0){
                // this is a valid seller
                const {name,category,description,price,discount} = req.body;
                const productid = uuid4();
                
                pool.query(queries.addProduct,[productid,name,category,description,price,discount,id],(error,result)=> {
                    if (error) {
                        console.log(error);
                        return res.status(400).json({message:"Error in uploading Product"});
                    };
                    res.status(201).json({message:"Product added successfully"});
                })
            }else{
                res.status(400).json({message:"User does not valid to add product"});
            }
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// for edit the product
const editProduct = async(req,res)=> {
    //check whether the product is belong to user or not
    // then edit the product

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.user;
        pool.query(queries.userExistSeller,[id],(error,result)=> {
            if (error) throw error;
            
            if(result.rows.length>0){
                // this is a valid seller
                const productid = req.params.productId;

                // whether product exist or not
                pool.query(queries.checkProduct,[productid,id],(error,result)=> {
                   
                    if(result.rows.length>0){
                        const {name,category,description,price,discount} = req.body;
                        
                        // finally updating the product
                        pool.query(queries.editProduct,[name,category,description,price,discount,productid,id],(error,result)=> {
                            if (error) {
                                console.log(error);
                                return res.status(400).json({message:"Error in updating Product"});
                            };
                            res.status(201).json({message:"Product updated successfully"});
                        })
                    }else{
                        return res.status(400).json({message:"Product does not exist"});
                    }
                })

                
            }else{
                res.status(400).json({message:"User does not valid to edit product"});
            }
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// for deletion of product
const deleteProduct = async(req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.user;
        pool.query(queries.userExistSeller,[id],(error,result)=> {
            if (error) throw error;
            
            if(result.rows.length>0){
                // this is a valid seller
                 // this is a valid seller
                 const productid = req.params.productId;

                 // whether product exist or not
                 pool.query(queries.checkProduct,[productid,id],(error,result)=> {

                    if(result.rows.length>0){
                         
                         // finally updating the product
                         pool.query(queries.deleteProduct,[productid],(error,result)=> {
                             if (error) {
                                 console.log(error);
                                 return res.status(400).json({message:"Error in updating Product"});
                             };
                             res.status(201).json({message:"Product deleted successfully"});
                         })
                     }else{
                         return res.status(400).json({message:"Product does not exist"});
                     }
                 })
            }else{
                res.status(400).json({message:"User does not valid to add product"});
            }
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// searching product using name or category
const getProduct = async(req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.user;
        pool.query(queries.userExist,[id],(error,result)=> {
            if (error) throw error;
            
            if(result.rows.length>0){
                // this is a valid seller
                const { name, category } = req.query;
                    let queryText= queries.searchProduct;
                    const queryParams = [];
            

                    if (name) {
                        // ILIKE for case-insensitive search
                        queryText += ' AND name ILIKE $1'; 
                        // Add wildcard for partial matching
                        queryParams.push(`%${name}%`); 
                    }else if(category) {
                        queryText += ' AND category ILIKE $1';
                        queryParams.push(`%${category}%`); 
                    }
            
                    
                    pool.query(queryText, queryParams,(error,result)=> {

                        if(error){
                            console.log(error);
                            return res.status(400).json({message:"Something went wrong"});
                        }

                        // Return the found products
                        if (result.rows.length > 0) {
                            res.status(201).json(result.rows);
                        } else {
                            res.status(404).json({ message: 'No products found' });
                        }
                    });
            
                
            }else{
                res.status(400).json({message:"User does not exist"});
            }
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}


// adding product to cart
const addProductToCart = async(req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.user;
        // user exist or not
        pool.query(queries.userExist,[id],async (error,result)=> {
            if (error) throw error;

            if(result.rows.length>0){
                // checking whether cart is exist or not
                pool.query(queries.checkExistCart,[id],async (error,result)=> {
                    let cartid;
                    // when cart does not exist
                    if(result.rows.length===0){
                        const createCartResult = await pool.query(queries.createCart, [id]);
                        cartid = createCartResult.rows[0].cartid;
                    }else{
                        // when cart already exist 
                        cartid = result.rows[0].cartid;
                    }

                    // now adding the product to cart
                    const {productid,quantity} = req.body;
                    pool.query(queries.addProductToCart,[cartid,productid,quantity],(error,result)=> {
                        if (error) throw error;

                        res.status(201).json({message:"Product Added to cart"});
                    })
                })
                
            }else{
                res.status(400).json({message:"User does not valid to add product"});
            }
        })

    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}

// removing product from cart with all quantity
const removeProductFromCart = async(req,res)=> {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.user;
        pool.query(queries.userExist,[id],async(error,result)=> {
            if (error) throw error;
            
            const productid = req.params.productId;

            if(result.rows.length>0){
                const result = await pool.query(queries.removeProductFromCart, [id,productid]);
                if (result.rowCount === 0) {
                        return res.status(404).json({ message: 'Product not found in cart' });
                }

                res.status(201).json({ message: 'Product removed from cart' });
            }else{
                res.status(400).json({message:"User does not valid to add product"});
            }
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
}


module.exports={
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
    addProductToCart,
    removeProductFromCart
}