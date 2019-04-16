const Effect = require("./Effect").Effect;
const Static = require("./StaticEffect").Effect;
const TrueStatic = require("./TrueStatic").Effect;

/**
 * Finds the effect desired by the system and creates it
 * @param {Object} layout The current system layout
 * @param {Object} effectobj Current system effect
 */
function GetEffect(layout, effectobj) {
  // Check that the effect object exists, has a type, and the type is in the table
  if (effectobj && effectobj.Type && effects[effectobj.Type])
    // Create and return that effect
    return new effects[effectobj.Type](layout, effectobj);

  // Otherwise return the default effect
  return new Effect(layout, effectobj);
}

/**
 * Table of all abailable effects
 */
const effects = {
  Static_Colors: Static,
  True_Static_Colors: TrueStatic
};

exports.GetEffect = GetEffect;
