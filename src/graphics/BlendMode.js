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
    Zero : 0,
    One : 1,
    SrcColor : 2,
    OneMinusSrcColor : 3,
    DstColor : 4,
    OneMinusDstColor : 5,
    SrcAlpha : 6,
    OneMinusSrcAlpha : 7,
    DstAlpha : 8,
    OneMinusDstAlpha : 9,
    SrcAlphaSaturate : 10
};

/** 
* Enum for blend equations
* @enum {number}
*/
sp.BlendMode.Equation = {
    Add : 0,
    Subtract : 1,
    ReverseSubtract : 2
};

/**
* Alpha blend mode
* Note: These are the predefined blend modes assuming that alpha is not premultiplied.
* @type BlendMode
*/
sp.BlendMode.Alpha = new sp.BlendMode(sp.BlendMode.Factor.SrcAlpha, sp.BlendMode.Factor.OneMinusSrcAlpha, sp.BlendMode.Equation.Add,
                                        sp.BlendMode.Factor.One, sp.BlendMode.Factor.OneMinusSrcAlpha, sp.BlendMode.Equation.Add);
/**
* Add blend mode
* @type BlendMode
*/
sp.BlendMode.Add = new sp.BlendMode(sp.BlendMode.Factor.SrcAlpha, sp.BlendMode.Factor.One, sp.BlendMode.Equation.Add,
                                      sp.BlendMode.Factor.One, sp.BlendMode.Factor.One, sp.BlendMode.Equation.Add);
/**
* Multiply blend mode
* @type BlendMode
*/
sp.BlendMode.Multiply = new sp.BlendMode(sp.BlendMode.Factor.DstColor, sp.BlendMode.Factor.Zero, sp.BlendMode.Equation.Add);