// Copyright (c) 2017 Julen Salgado. All rights reserved.

/**
* @fileoverview Keyboard class imlpementation
* @author Julen Salgado (julensalgado@gmail.com)
*/

goog.provide('sp.Keyboard');
goog.require('sp');

sp.Keyboard = {
    pressed_ : []
};

sp.Keyboard.isKeyPressed = function (key) {
    return sp.Keyboard.pressed_[key];
};

sp.Keyboard.pressKey = function (key) {
    sp.Keyboard.pressed_[key] = true;
};

sp.Keyboard.releaseKey = function (key) {
    sp.Keyboard.pressed_[key] = false;
};

/** 
* Enum for keys
* @enum {number}
*/
sp.Keyboard.Key = {
    BACKSPACE : 8,
    TAB : 9,
    ENTER : 13,
    SHIFT : 16,
    CTRL : 17,
    ALT : 18,
    PAUSE : 19,
    CAPS_LOCK : 20,
    ESCAPE : 27,
    PAGE_UP : 33,
    PAGE_DOWN : 34,
    END : 35,
    HOME : 36,
    LEFT : 37,
    UP : 38,
    RIGHT : 39,
    DOWN : 40,
    INSERT : 45,
    DELETE : 46,
    NUM_0 : 48,
    NUM_1 : 49,
    NUM_2 : 50,
    NUM_3 : 51,
    NUM_4 : 52,
    NUM_5 : 53,
    NUM_6 : 54,
    NUM_7 : 55,
    NUM_8 : 56,
    NUM_9 : 57,
    A : 65,
    B : 66,
    C : 67,
    D : 68,
    E : 69,
    F : 70,
    G : 71,
    H : 72,
    I : 73,
    J : 74,
    K : 75,
    L : 76,
    M : 77,
    N : 78,
    O : 79,
    P : 80,
    Q : 81,
    R : 82,
    S : 83,
    T : 84,
    U : 85,
    V : 86,
    W : 87,
    X : 88,
    Y : 89,
    Z : 90,
    LEFT_WINDOW : 91,
    RIGHT_WINDOW : 92,
    SELECT : 93,
    NUMPAD_0 : 96,
    NUMPAD_1 : 97,
    NUMPAD_2 : 98,
    NUMPAD_3 : 99,
    NUMPAD_4 : 100,
    NUMPAD_5 : 101,
    NUMPAD_6 : 102,
    NUMPAD_7 : 103,
    NUMPAD_8 : 104,
    NUMPAD_9 : 105,
    MULTIPLY : 106,
    ADD : 107,
    SUBTRACT : 109,
    DECIMAL_POINT : 110,
    DIVIDE : 111,
    F1 : 112,
    F2 : 113,
    F3 : 114,
    F4 : 115,
    F5 : 116,
    F6 : 117,
    F7 : 118,
    F8 : 119,
    F9 : 120,
    F10 : 121,
    F11 : 122,
    F12 : 123,
    NUM_LOCK : 144,
    SCROLL_LOCK : 145,
    SEMICOLON : 186,
    EQUAL : 187,
    COMMA : 188,
    DASH : 189,
    PERIOD : 190,
    FORWARD_SLASH : 191,
    GRAVE_ACCENT : 192,
    OPEN_BRACKET : 219,
    BACK_SLASH : 220,
    CLOSE_BRACKET : 221,
    SINGLE_QUOTE : 222
};

window.addEventListener('keyup', function(event) {
    sp.Keyboard.pressKey(event.keyCode);
});
window.addEventListener('keydown', function(event) {
    sp.Keyboard.releaseKey(event.keyCode);
});
