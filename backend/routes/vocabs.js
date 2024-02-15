const express = require('express');
const Vocab = require('../models/vocab');

const router = express.Router();

router.post('', (req, res, next) => {
  const vocab = new Vocab({
    japanese: req.body.japanese,
    korean: req.body.korean,
    english: req.body.english,
    polish: req.body.polish
  })
  vocab.save().then(createdVocab => {
    res.status(201).json({
      message: 'Vocab added successfully',
      postID: createdVocab._id
    });
  });
});

router.put('/:id', (req, res, next) => {
  const vocab = new Vocab({
    _id: req.body.id,
    japanese: req.body.japanese,
    korean: req.body.korean,
    english: req.body.english,
    polish: req.body.polish
  });
  Vocab.updateOne({_id: req.params.id}, vocab).then(result => {
    console.log(result);
    res.status(200).json({message: 'Update successful'});
  });
});

// router.get('', (req, res, next) => {
//   const vocabs = [];
//
//   Vocab.find().then(documents => {
//     res.status(200).json({
//       vocabs: documents
//     });
//   });
// });
router.get('', (req, res, next) => {
const pageSize = +req.query.pagesize;
const currentPage = +req.query.page;
const vocabQuery = Vocab.find();
let fetchedVocabs;
if (pageSize && currentPage) {
  vocabQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
}
vocabQuery.then((documents) => {
  fetchedVocabs = documents
  return Vocab.count();
})
  .then(count => {
    res.status(200).json({
      message: 'Vocabs fetched successfully!',
      vocabs: fetchedVocabs,
      maxVocabs: count
    })
  });
});


router.get('/:id', (req, res, next) => {
  Vocab.findById(req.params.id).then(vocab => {
    if (vocab) {
      res.status(200).json(vocab);
    } else {
      res.status(404).json({message: 'Vocab not found'})
    }
  })
}  );

router.delete('/:id', (req, res, next) => {
  Vocab.deleteOne({ _id: req.params.id}).then(result => {
    res.status(200).json({ message: 'Vocab deleted successfully', });
  });
});

module.exports = router;
