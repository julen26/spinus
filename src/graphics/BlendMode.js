goog.provide('sp.BlendMode');

/**
* Constructs BlendMode objects
* @class Represents a BlendMode object
* @param {BlendMode.Factor} srcColorFactor - Factor for the source color
* @param {BlendMode.Factor} dstColorFactor - Factor for the destination color
* @param {BlendMode.Equation} colorEquation - Color equation
* @param {BlendMode.Factor} srcAlphaFactor - Factor for the source alpha
* @param {BlendMode.Factor} dstAlphaFactor - Factor for the destination alpha
* @param {BlendMode.Equation} alphaEquation - Alpha equation
*/
sp.BlendMode = function(srcColorFactor, dstColorFactor, colorEquation, srcAlphaFactor, dstAlphaFactor, alphaEquation) {
    /**
    * Factor for the source color
    * @type BlendMode.Factor
    */
	this.srcColorFactor = srcColorFactor;
    /**
    * Factor for the destination color
    * @type BlendMode.Factor
    */
	this.dstColorFactor = dstColorFactor;
    /**
    * Color equation
    * @type BlendMode.Equation
    */
	this.colorEquation = colorEquation = sp.BlendMode.Equation.Add;
    /**
    * Factor for the source alpha
    * @type BlendMode.Factor
    */
	this.srcAlphaFactor = srcAlphaFactor || srcColorFactor;
    /**
    * Factor for the destination alpha
    * @type BlendMode.Factor
    */
	this.dstAlphaFactor = dstAlphaFactor || dstColorFactor;
    /**
    * Alpha equation
    * @type BlendMode.Equation
    */
	this.alphaEquation = alphaEquation || colorEquation;
};

/** 
* Enum for blend factors
* @enum {number}
*/
sp.BlendMode.Factor = {
    ZERO : 0,
    ONE : 1,
    SRC_COLOR : 2,
    ONE_MINUS_SRC_COLOR : 3,
    DST_COLOR : 4,
    ONE_MINUS_DST_COLOR : 5,
    SRC_ALPHA : 6,
    ONE_MINUS_SRC_ALPHA : 7,
    DST_ALPHA : 8,
    ONE_MINUS_DST_ALPHA : 9,
    SRC_ALPHA_SATURATE : 10
};

/** 
* Enum for blend equations
* @enum {number}
*/
sp.BlendMode.Equation = {
    ADD : 0,
    SUBTRACT : 1,
    REVERSE_SUBTRACT : 2
};

/**
* Alpha blend mode
* Note: These are the predefined blend modes assuming that alpha is not premultiplied.
* @type BlendMode
* @const
*/
sp.BlendMode.ALPHA = new sp.BlendMode(sp.BlendMode.Factor.SRC_ALPHA, sp.BlendMode.Factor.ONE_MINUS_SRC_ALPHA, sp.BlendMode.Equation.ADD,
                                        sp.BlendMode.Factor.ONE, sp.BlendMode.Factor.ONE_MINUS_SRC_ALPHA, sp.BlendMode.Equation.ADD);
/**
* Add blend mode
* @type BlendMode
* @const
*/
sp.BlendMode.ADD = new sp.BlendMode(sp.BlendMode.Factor.SRC_ALPHA, sp.BlendMode.Factor.ONE, sp.BlendMode.Equation.ADD,
                                      sp.BlendMode.Factor.ONE, sp.BlendMode.Factor.ONE, sp.BlendMode.Equation.ADD);
/**
* Multiply blend mode
* @type BlendMode
* @const
*/
sp.BlendMode.MULTIPLY = new sp.BlendMode(sp.BlendMode.Factor.DST_COLOR, sp.BlendMode.Factor.ZERO, sp.BlendMode.Equation.ADD);