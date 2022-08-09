import multer from "multer";

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        console.log('multer', req.body);
        console.log('multer1', req.body.name);
        console.log('multer2', req.files);
        console.log('multer3', file);
        cb(null, req.body.name);
    }
})

export const upload = multer({storage: storage});