monkeywrangler
==============

Misc experiments with this tool.

The original idea was to create intellegent screen grapper as a Monkeywrangler script and storing all details I
needed from thai2english.com as flashcards on the DropBox datastore. That would give me easy access to the database
and allow me to set up various flashcard apps later.

Unfortunately, it turned out to be much  more difficult that I had anticipated, so I have ended up reverting to a concept I 
was confident I would be able to get up and running quickly. 

The project now consist of a couple of files on the host of choice with access to PHP and mysql:

- insert_card.php
- list_cards.php

And the source for the monkeywrangler script is in this file

- retain certain information.js


Plans are to migrate this concept to use the DropBox API eventually and create a Chrome extension instead of 
the monkeywrangler script.


