const db = require("../../models");
const Company = db.company;
var multer = require("multer");
var path = require("path");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assests/uploads/company");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname).toLocaleLowerCase());
    },
});

var upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname).toLocaleLowerCase();
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only png, jpg, jpeg images are allowed"));
        }
        callback(null, true);
    },
}).single("logo");


exports.createCompany = async (req, res) => {
    try {

        upload(req, res, async function (err) {
            if (err) {
                res.status(400).json({

                    message: (err.message == "File too large") ? err.message + " the maximum is 2 Mb" : err.message
                });

            } else {
                let data = {
                    name: req.body.name,
                    registrationNumber: req.body.registrationNumber,
                    logo: req.file.path,
                };
                console.log(data);
                await Company.create(data);
                return res
                    .status(200)
                    .json({ messages: "Company Created Successfully" });
            }
        });

    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCompany = async (req, res) => {
    try {
        const id = req.params.id;

        let company = await Company.findOne({ where: { id: id } });
        if (company == null) {
            return res
                .status(400)
                .json({ msg: "Company Not Found" });
        }
        await Company.destroy({
            where: { id: id },
        });
        await fs.unlink(company.logo, (err) => {

            if (err) {
                console.log(err);
            }
        });
        return res.status(200).json({
            message: "Company Delete Successfully",
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};