const { PrismaClient } = require("@prisma/client")
const express = require("express")
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/api", async (req,res) => {
    try {

        const {range, vga, Prosessor} = req.query
        if(range == null || vga == null || Prosessor == null) {
            return res.status(400).send("range or vga or Prosessor query is missing")
        }
        console.log(range, vga, Prosessor)
        const data = await prisma.laptop_kelompok2.findMany({where : {
            harga : {
                lte : parseInt(range)
            },
            vga : {
                contains : vga
            },
            Prosessor : {
                contains : Prosessor
            }
        }})
        res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return  res.status(500)
    }
})

app.post("/api", async (req, res) => {
    try {
        console.log(req.body)
        const data = await prisma.laptop_kelompok2.create({
            data: req.body
        })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Error")
    }

})

app.put("/api/:id", async (req, res) => {
    try {
        const data = await prisma.laptop_kelompok2.update({ where : {id: parseInt(req.params.id)}, data : req.body })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Error")
    }
})


app.delete("/api/all", async (req,res) => {
    try {
        
        const data = await prisma.laptop_kelompok2.deleteMany()
        return res.status(200).json(data)

    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.delete("/api/:id", async (req,res) => {
    try {
        
        const data = await prisma.laptop_kelompok2.delete({where : {id : parseInt(req.params.id)}})
        return res.status(200).json(data)

    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})

app.listen(4000, () => {
    console.log("Server berjalan di http://localhost:4000")
})