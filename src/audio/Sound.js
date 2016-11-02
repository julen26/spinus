goog.provide('sp.Sound');

/**
* Constructs Sound objects
* @class Represents a Texture object
*/
sp.Sound = function() {
};

/**
* Loads the sound from file
*
* @method
* @param {string} sourcePath - Path of the sound file must be in the same domain
* @param {function} callback - Callback function
*/
sp.Sound.prototype.loadFromFile = function (sourcePath, callback) {
    this.m_audio = new Audio();
	this.m_callback = callback;
    this.m_audio.onload = this.handleLoadedSound.bind(this);
    this.m_audio.src = sourcePath;
};

sp.Sound.prototype.loadFromImage = function (audio) {
    this.m_audio = audio;
    this.handleLoadedSound();
};

sp.Sound.prototype.handleLoadedSound = function () {
    if (this.m_callback) {
	   this.m_callback();
    }
};
