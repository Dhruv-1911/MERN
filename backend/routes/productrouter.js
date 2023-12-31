import express from 'express';
import Product from '../model/product.js';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {}
});

const PAGE_SIZE = 3;
router.get(
  '/search',
  asyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || '1';
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchquery = query.query || '';

    const queryFilter =
      searchquery && searchquery !== 'all'
        ? {
            name: {
              $regex: searchquery,
              $options: 'i',
            },
          }
        : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};

    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const priceFilter =
      price && price !== 'all'
        ? {
            name: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const product = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countproduct = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    res.send({
      product,
      countproduct,
      page,
      pages: Math.ceil(countproduct / pageSize),
    });
  })
);

router.get(
  '/categories',
  asyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

router.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send({ message: 'Not Found Product' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.originalname.split('.')[0]}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limit: { filesize: 1000000 * 10000 }, //10 gb file
}).single("myfile")

router.post(
  '/',
  upload,
  asyncHandler(async (req, res) => {
    try {
      cloudinary.config({
        cloud_name: 'ddulwmfmb',
        api_key: '745817617929836',
        api_secret: 'ahL-5PKocvEjPuIEwsEuyS8NYkw',
      });
      console.log(req.file.path);
      let fileUrl = path.resolve() + '/' + req.file.path;
      const result = cloudinary.uploader  
        .upload(fileUrl, {
          public_id: req.file.originalname.split('.')[0],
        })
        .then(async (data) => {
          const product = new Product({
            name: req.body.name,
            slug: req.body.slug,
            image: data.url,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            description: req.body.description,
          });

          const products = await product.save();

          return res.status(201).json({ message: 'product created', products });
        })
        .catch((e) => {
          console.log('e: ', e);
          return res.status(400).json({ message: e});
        });
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).json({ message: error });
    }
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const option = { new: true };
    const result = await Product.findByIdAndUpdate(id, update, option);
    res.status(201).json({ message: 'product update' });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.status(201).json({ message: 'product delete' });
  })
);

export default router;
