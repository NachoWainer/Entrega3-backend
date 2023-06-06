import fs from "fs"
export class Product{
    constructor(id,title,description,price,thumbnail,code,stock){
    this.id=id;
    this.title=title;
    this.description=description;
    this.price=price;
    this.thumbnail=thumbnail;
    this.code=code;
    this.stock=stock;
}}
export class ProductManager{

    constructor(){ 
        this.path ="./src/products.json"}

    addProduct = async( 
        title, description , price, thumbnail, code ,stock
        )=>{
            if (title === undefined || description === undefined || price === undefined ||
                thumbnail === undefined || code === undefined || stock === undefined) {
              console.error("Los productos a agregar deben incluir 6 campos: title, description, price, thumbnail, code, stock");
              return;
            }
            const product= new Product(
                1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            )
        try{    
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const content = JSON.parse(data);
        
            if (content.find(element => element.code === code)) {
                console.error("el codigo ya esta en uso")
                return
            }
            if (content.length === 0)  product.id = 1 
            else product.id =  content.length + 1;
            content.push(product)
 
            await fs.promises.writeFile(this.path,JSON.stringify(content,null,'\t'))
        }catch(error){
            const arr = [] 
            arr.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(arr, null, '\t'));
        }
      
    }

    getProducts=async()=> {
        try{
            const data = await fs.promises.readFile(this.path,'utf-8')  
            const product = JSON.parse(data)
            return product
            }
        catch(error){
            console.error("No existen productos")
            return 
            }
        }

    
    getProductById = async (productId) =>{
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
        
            const products = JSON.parse(data)
            if(products.find(e => e.id === productId)) {
                return products.find(e => e.id === productId)}
            else {
                console.log("No hay productos con ese ID")
                return
        }
        } catch (error) {
            console.error("No existen productos")
            return
            
        }
    }

    updateProduct = async(productId, prop , value) =>{
       
        if ("title" === prop || "description" === prop || "price" === prop ||
            "thumbnail" === prop || "code" === prop || "stock" === prop){
            try {
                const data =await  fs.promises.readFile(this.path,'utf-8')
        
                const products = JSON.parse(data)
                if(products.find(e=>e.id===productId)){
                    let index = products.findIndex(e=>e.id===productId)
                    let aux2 = products[index][prop]
                    products[index][prop]=value;
                    console.log("actualización exitosa,\n producto con ID:"+ productId +"\t Su propiedad:" + prop +" \t cambio:"+ aux2 + "------>" + value )
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
                return products
            }
            else{
                console.log("No existe producto con ese ID")
                return
            }

            
            } catch (error) {
                console.error("No existen productos")
            return
                    
            }     
        }

        else {
            console.log("Propiedad invalida")
            return
        }
    }

    deleteProduct =async(productId)=>{
        try {
            const data = await fs.promises.readFile(this.path,'utf-8')
            const products = JSON.parse(data)
       
            if (products.find(e=>e.id===productId)){
                products.splice(products.findIndex(e=>e.id===productId), 1)
                console.log("Producto eliminado")
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'))
                return products
            }
            else {
                console.error("No existe producto con ese ID")
                return
            }
            
        } catch (error) {
            console.error(error)
            return []
        }
        
        
    }


    
}

