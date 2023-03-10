import connectMongo from "../../../lib/connectMongo";
import Product from "../../../models/Products";

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */

export default async function getAll(req, res) {
    
        try {

            await connectMongo();
            console.log("Connexted To mongo")

            const product = await Product.find()
            res.json(product)
        } catch (error) {
            console.log(error)
            res.json({ error })
        }
    

}