var sound = new sp.Sound();
sound.loadFromFile('./resources/sound.wav',  function() {
    sound.setSpeed(2);
	sound.setLoop(true);
	sound.play();
});