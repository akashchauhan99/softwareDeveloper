const moongoose = require('mongoose')

const NoteScheema = moongoose.Schema(
   {
      title: String,
      content: String
   },
   { timestamps: true }
)
module.exports = moongoose.model('Note', NoteScheema)
