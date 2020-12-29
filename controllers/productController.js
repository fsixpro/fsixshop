import Product from '../models/ProductModel.js'
import User from '../models/UserModel.js'
import Utility from '../utils/Utility.js'
const util = new Utility()
export const getProducts = async (req, res) => {
  const pageSize = 5
  const pageNumber = Number(req.query.pageNumber) || 1
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const totalProduct = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))
    if (!products) return util.failureResponse(res, 404, 'no product found')

    return util.successResponse(res, 200, {
      products,
      pageNumber,
      pages: Math.ceil(totalProduct / pageSize),
    })
  } catch (error) {
    console.log(error)
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const getProductsAdmin = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const products = await Product.find({ ...keyword })
    if (!products) return util.failureResponse(res, 404, 'no product found')
    return util.successResponse(res, 200, products)
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return util.failureResponse(res, 404, 'product not found')
    return util.successResponse(res, 200, product)
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample Product',
      price: 0,
      user: req.user,
      image: '/images/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample category',
      description: 'Sample Description',
      countInStock: 0,
    })
    const createdProduct = await product.save()
    return util.successResponse(res, 201, createdProduct)
  } catch (error) {
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      brand,
      category,
      description,
      price,
      numReviews,
      countInStock,
    } = req.body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        brand,
        category,
        description,
        price,
        numReviews,
        countInStock,
      },
      { omitUndefined: true, new: true }
    )
    if (!updatedProduct)
      return util.failureResponse(res, 404, 'product not found')
    return util.successResponse(res, 200, updatedProduct)
  } catch (error) {
    console.log(error.kind)
    if (error.kind == 'ObjectId')
      return util.failureResponse(res, 404, 'product not found')
    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const deleteProduct = async (req, res) => {
  try {
    if (await Product.findByIdAndDelete(req.params.id)) {
      return util.successResponse(res, 200)
    }
  } catch (error) {
    console.log(error)

    return util.failureResponse(res, 500, 'internal server error')
  }
}

export const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const user = await User.findById(req.user)
    const product = await Product.findById(req.params.id)
    if (!product) return util.failureResponse(res, 404, 'product not found')
    const reviewed = product.reviews.find(
      review => review.user.toString() === req.user.toString()
    )
    if (reviewed)
      return util.failureResponse(res, 400, 'product already reviewed')
    const review = {
      name: user.name,
      rating,
      comment,
      user: req.user,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, cur) => cur.rating + acc, 0) /
      product.reviews.length
    await product.save()
    return util.successResponse(res, 201, {
      msg: 'review added',
    })
  } catch (error) {
    console.log(error)

    return util.failureResponse(res, 500, 'internal server error')
  }
}
export const getProductsTop = async (req, res) => {
  try {
    const topProduct = await Product.find().sort({ rating: -1 }).limit(3)
    if (!topProduct) return util.failureResponse(res, 404, 'no product found')
    return util.successResponse(res, 200, topProduct)
  } catch (error) {
    console.log(error)

    return util.failureResponse(res, 500, 'internal server error')
  }
}
