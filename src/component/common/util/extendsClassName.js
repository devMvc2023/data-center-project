const getSpace = (value1, value2) => {
  if (value1 && value2) return `${value1} ${value2}`;
  return value2;
};

/**
 *
 * @param {string[]} classList
 * @returns
 */
function extendesClassname(classList = []) {
  let className = "";

  if (!Array.isArray(classList) || classList.length < 1) return null;

  classList.forEach(($class) => {
    if ($class) className = getSpace(className, $class);
  });

  if (!className) return null;

  return { className };
}

export default extendesClassname;
