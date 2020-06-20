const morgan = require('morgan');
const express = require('express');

const app = express()
morgan.token("body", req => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :body - status :status length :res[content-length] - :response-time ms"
  )
);

const numbers = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

const generatedId = () => {
    const maxId = numbers.length > 0
        ? Math.floor(Math.random() * Math.floor(200))
        : 0
    return maxId
}

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${numbers.length} people</p>`
    )
})

app.get('/api/numbers', (req,res)=>{
    res.json(numbers)
})

app.get('/api/numbers/:id',(request, response) => {
    const id = Number(request.params.id)
    const number = numbers.find(number => number.id === id)
    number ? response.json(number) : response.status(404).end()
})

app.delete('/api/numbers/:id',(request,response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(number => number.id !== id)

    response.status(204).end()
})

app.post('/api/numbers/:id',(request,response) => {

    const body = request.body

    if(numbers.includes(person => person.name === body.name)){
      response.status(400).json({ error: 'duplicate content'})
    }

    if (!body.number || !body.name)
    {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    const person = {
      name: body.name,
      number: body.number || false,
      id: generateId()
    }

    numbers = numbers.concat(person)

    response.json(numbers)
})

const port = 3001

app.listen(port, () => {
console.log(`Server running on port ${port}`)
})
