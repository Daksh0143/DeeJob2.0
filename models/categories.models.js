const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./user.models");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:User
        }
    },
    { timestamps: true }
);

categorySchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
