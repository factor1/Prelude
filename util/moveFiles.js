/*
 * Prelude Move Files Script
 *
 * DO NOT EDIT THIS FILE IF YOU DO NOT KNOW WHAT YOU ARE DOING!
 * This file is only intended for initial setup of Prelude and does not directly
 * modify the WordPress theme at all. If you are looking for theme JavaScript
 * please look in assets/js.
 *
 * This script may not work on all operating systems and may produce errors in
 * unsupported OS's.
 */

const prompt = require('prompt'),
      colors = require('colors'),
      { exec } = require('child_process');

// only run if we aren't a travis test
if( process.env.CI !== 'true' && process.env.TRAVIS !== 'true') {
  prompt.start();

  const promptTextMove = 'Attempt to move prelude files into project directory? Y/N (Note this may not work on all OS)';

  prompt.get([promptTextMove], (err, result) => {
    let userInputMove = result[promptTextMove];

    const getResponse = () => {
      if( userInputMove === 'Y' || userInputMove === 'y' || userInputMove === 'yes' ) {
        console.log('You answered yes... Attempting move.'.green);

        exec(`rsync -a -v --ignore-existing --exclude-from 'exclude.txt' ./ ./../../`,(err, stdout, stderr) => {
          if(err) {
            console.error('There was an error moving the files. Please try manually.');
            return;
          }

          if( stdout ) {
            console.log(stdout);
          }

          if( stderr ){
            console.log(stderr);
          }

        });

      } else if (userInputMove === 'N' || userInputMove === 'n' || userInputMove === 'no') {
        console.log('No move attempted... Happy Pressing!.'.green);
      }
    }

    getResponse();

  });
}
