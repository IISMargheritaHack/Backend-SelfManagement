import express from 'express'
import Corso from '../models/Corso.js'
import User from '../models/User.js'
const router = express.Router();

//cerca tutti i corsi
router.get("/", async (req,res) => {
    
    try {
       const corsi = await Corso.find()
       res.status(200).json(corsi)
    } catch (error) {
        res.status(500).json(error)
    }
})

//cerca una Corso
router.get("/:id", async (req,res) => {
    
    try {
       const corso = await Corso.findById(req.params.id)
       res.status(200).json(corso)
    } catch (error) {
        res.status(500).json(error)
    }
})

//aggiungi iscritto
router.post("/:id", async (req,res) => {
    
    try {
       const corso = await Corso.findById(req.params.id)

       const newIscritti = [req.body.id, ...corso.iscritti]

       corso.iscritti = newIscritti;

       await corso.save();
       await User.findByIdAndUpdate(req.body.id, {$inc: {"iscrizioni": 1}})

       res.status(200).json("updated")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
})

//elimina iscritto
router.post("/annulla/:id", async (req,res) => {
    
    try {
       const corso = await Corso.findById(req.params.id)

       const newIscritti = corso.iscritti.filter(item => item != req.body.id)

       corso.iscritti = newIscritti;

       await corso.save();
       await User.findByIdAndUpdate(req.body.id, {$dec: {"iscrizioni": -1}})

       res.status(200).json("updated")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
})

//crea una Corso
router.post("/", async (req,res) => {
    
    try {
       const corso = await Corso.create(req.body)
       res.status(200).json(corso)
    } catch (error) {
        res.status(500).json(error)
    }
})


//get corsi di un organizzatore
router.get("/organizzatore/:id", async (req,res) => {
    
    try {
       const corsi = await Corso.find({organizzatore: req.params.id}).populate("organizzatore")
       res.status(200).json(corsi)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get iscritti di un corso
router.get("/iscritti/:id", async (req,res) => {
    
    try {
       const corso = await Corso.findById(req.params.id).populate("iscritti")
       res.status(200).json({lista: corso?.iscritti, name: corso?.name})
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;