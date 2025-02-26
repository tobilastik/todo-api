import { Request, Response } from "express"
import { db } from "../../db/index"
import { productTable } from "../../db/productSchema"
import { eq } from "drizzle-orm"

export async function listProduct(req: Request, res: Response) {
  try {
    const products = await db.select().from(productTable)
    res.json(products)
  } catch (error) {
    res.status(500).send(error)

  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const [product] = await db.select().from(productTable).where(eq(productTable.id, Number(id)))
    if (!product) {
      res.status(404).send({ message: "Product not found" })
    } else {
      res.json(product)
    }
  } catch (error) {
    res.status(500).send(error)

  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db.insert(productTable).values(req.body).returning()
    res.status(201).json(product)
  } catch (error) {
    res.status(500).send(error)
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const updatedFields = req.body

    const [product] = await db.update(productTable).set(updatedFields).where(eq(productTable.id, id)).returning()

    if (product) {
      res.json(product).send()
    } else {
      res.status(404).send({ message: "Product was not found" })
    }

  } catch (error) {
    res.status(500).send(error)

  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const [deletedProduct] = await db.delete(productTable).where(eq(productTable.id, id)).returning()
    if (deletedProduct) {
      res.status(204).send()
    } else {
      res.status(404).send({ message: "Product was not found" })
    }
  } catch (error) {
    res.status(500).send(error)

  }
}