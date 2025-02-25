import { Request, Response } from "express"

export function listProduct (req: Request, res: Response) {
  res.send('the list of products new')
}

export function getProductById (req: Request, res: Response) {
  res.send('getProductById')
}

export function createProduct (req: Request, res: Response) {
  res.send('create of products new')
}

export function updateProduct (req: Request, res: Response) {
  res.send('Update of products new')
}

export function deleteProduct (req: Request, res: Response) {
  res.send('delete of products new')
}