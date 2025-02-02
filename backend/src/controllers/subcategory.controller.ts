import { Request, Response } from "express";
import db from "../models";
const mediaInput = require("../middlewares/mediaInput");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const SubCategory = db.subcategories;
const Category = db.categories;

// Create and Save a new blog
export const create = async (req: any, res: Response): Promise<void> => {
  try {
    // Validate request
    console.log("Working", req.files);

    if (req.files?.subCategoryImage) {
      let response = await mediaInput.uploadMedia(
        req.files.subCategoryImage[0]
      );

      if (!response.uploaded) {
        res.status(500).send({
          message: "File Could not get uploaded please try again later!",
        });
      }
      req.body.subcategory_image = response.url;
    }
    if (
      !req.body.category ||
      !req.body.subcategory_image ||
      !req.body.subcategory
    ) {
      console.log("Flailed");
      res.status(400).send({ message: "Content missing in body!" });
      return;
    }

    // Save blog in the database
    const data = await SubCategory.create(req.body);
    res.send(data);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the product.",
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  console.log("hitted");
  try {
    // const content = req.query.content;
    // const condition = content ? { state_name: content } : null;
    const condition = { activation_status: true };

    const data = await SubCategory.findAll({ where: condition });
    res.send(data);
  } catch (err: any) {
    console.log(err);
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving blogs.",
    });
  }
};

export const findByState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const state = decodeURIComponent(req.params.state);

    const data = await SubCategory.findOne({
      where: { state_name: state },
      attributes: ["city_info"],
    });
    if (!data) {
      res.status(404).send({ message: "Not found blog with id " });
    } else {
      res.send(data);
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving blog with id=" });
  }
};

export const update = async (req: any, res: any): Promise<void> => {
  try {
    const id = req.params.id;

    // Validate request
    console.log("Working", req.files);

    if (req.files?.subCategoryImage) {
      let response = await mediaInput.uploadMedia(
        req.files.subCategoryImage[0]
      );

      if (!response.uploaded) {
        res.status(500).send({
          message: "File Could not get uploaded please try again later!",
        });
      }
      req.body.subcategory_image = response.url;
    }

    const [rowsUpdated] = await SubCategory.update(req.body, {
      where: { id: id },
    });

    if (rowsUpdated === 0) {
      res.status(404).send({
        message: `Cannot update SubCategory with id=${id}. Maybe SubCategory was not found!`,
      });
    } else {
      res.send({ message: "SubCategory was updated successfully." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating SubCategory with id=",
    });
  }
};

export const disableSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    console.log("REceived id", id);

    const rowsUpdated = await SubCategory.update(
      { activation_status: false },
      {
        where: { id: id },
      }
    );

    if (rowsUpdated === 0) {
      res.status(404).send({
        message: `Cannot update SubCategory with id=${id}. Maybe SubCategory was not found!`,
      });
    } else {
      res.send({ message: "SubCategory was updated successfully." });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating SubCategory with id=",
    });
  }
};

export const enableSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const rowsUpdated = await SubCategory.update(
      { activation_status: true },
      {
        where: { id: id },
      }
    );

    if (rowsUpdated === 0) {
      res.status(404).send({
        message: `Cannot update SubCategory with id=${id}. Maybe SubCategory was not found!`,
      });
    } else {
      res.send({ message: "SubCategory was updated successfully." });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error updating SubCategory with id=${req.params.id}`,
    });
  }
};

export const deleteSubCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;

    const rowsDeleted = await SubCategory.destroy({
      where: { id: id },
    });

    if (rowsDeleted === 0) {
      res.status(404).send({
        message: `Cannot delete SubCategory with id=${id}. Maybe SubCategory was not found!`,
      });
    } else {
      res.send({
        message: "SubCategory was deleted successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Tutorial with ",
    });
  }
};

export const getSubCatByCatId = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      throw new ApiError(
        httpStatus.UNPROCESSABLE_ENTITY,
        "Category Id not provided"
      );
    }
    const categoryName = await Category.findOne({
      raw: true,
      where: { id: categoryId, activation_status: true },
    });
    console.log("Category ", categoryName);
    const subCategories = await SubCategory.findAll({
      raw: true,
      where: { category: categoryName.category, activation_status: true },
    });
    let finalSubCategories = await subCategories.map((subCat: any) => ({
      id: subCat.id,
      subcategory: subCat.subcategory,
    }));
    res.send(finalSubCategories);
  }
);

export const deleteAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const rowsDeleted = await SubCategory.destroy({
      where: {},
      truncate: false,
    });

    res.send({
      message: `${rowsDeleted} SubCategorys were deleted successfully!`,
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all blogs.",
    });
  }
};

export const findAllPublished = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await SubCategory.findAll({ where: { published: true } });
    res.send(data);
  } catch (err: any) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving blogs.",
    });
  }
};
