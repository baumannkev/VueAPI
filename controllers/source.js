// import { v4 as uuidV4 } from "uuid"

import Source from "../models/sources.js"
// import router from "../routes/source.js"

//GET ALL SOURCES
export const getSources = function(req, res) {
    const sources = Source;
    sources.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });
}

//GET ONE SOURCE
export const getOneSource = function(req, res) {
    const sourceId = req.params.id

    const sources = Source;

    sources.findById(sourceId)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });
}

//CREATE ONE SOURCE
export const createSource = function(req, res) {
    const source = new Source({
        title: req.body.title,
        link: req.body.link,
        editMode: req.body.editMode,
        // id: uuidV4()
    });

    source.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });

}

//DELETE ONE SOURCE
export const deleteSource = function(req, res) {
    const sourceId = req.params.id

    const sources = Source;

    sources.remove({ _id: sourceId })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });
}

//UPDATE ONE SOURCE
export const updateSource = function(req, res) {
    const sourceId = req.params.id;
    const sourceBody = req.body;

    const sources = Source;

    sources.updateOne({ _id: sourceId }, { $set: { title: sourceBody.title, link: sourceBody.link } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err)
            res.json({ message: err });
        });
}