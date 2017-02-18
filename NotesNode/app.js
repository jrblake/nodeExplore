const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleoptions = {
  describe: 'Title of the Note',
  demand: true,
  alias: 't'
};

const bodyoptions = {
  describe: 'Body of the Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
  .command('add', 'Add A New Note', {
    title: titleoptions,
    body: bodyoptions
  })
  .command('list', 'List All Notes')
  .command('read', 'Read A Note', {
    title: titleoptions
  })
  .command('remove', 'Remove A Note', {
    title: titleoptions
  })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note){
    console.log('Note Created');
    notes.logNote(note);
  } else {
    console.log('Note Title Taken');
  };
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => {
    notes.logNote(note);
  });
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log('Note Found');
    notes.logNote(note);
  } else {
    console.log('Note Not Found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note Deleted' : 'Note Not Found';
  console.log(message);
} else {
  console.log('Command not recognized');
};