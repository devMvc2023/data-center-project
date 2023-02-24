const BREAKPOINTS_SIZE = {
  SM: 368,
  XS: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1440,
  XXXL: 1680,
};

/**
 * @see SM = 368px
 * @see XS = 576px
 * @see MD = 768px
 * @see LG = 992px
 * @see XL = 1200px
 * @see XXL = 1440px
 * @see XXL = 1680px
 * @see mediafeature = 'max'
 *
 * @param {'XS' | 'SM' | 'MD' | 'LG' | 'XL' | 'XXL' | 'XXXL'} bp
 * @param {'min' | 'max'} mediafeature
 * @returns
 */

function breakpoint(bp, mediafeature = "max") {
  const isExistingBreakpoint = Object.keys(BREAKPOINTS_SIZE).some(
    (b) => b === bp
  );

  if (isExistingBreakpoint) {
    return `@media screen and (${mediafeature}-width: ${BREAKPOINTS_SIZE[bp]}px)`;
  }

  return `@media screen and (${mediafeature}-width: ${bp}px)`;
}

export default breakpoint;
