export function endpointsGenerator(stack, prefix = "") {
  if (!Array.isArray(stack)) {
    console.error("Invalid stack type", typeof stack);
    return [];
  }

  let endPoints = [];
  stack.forEach((route) => {
    const path = route?.route?.path;
    const methods = Object.keys(route?.route?.methods);
    endPoints.push({
      name: `${
        path.toLowerCase().trim().replace("/", "") ||
        `${methods[0]}_${prefix.toLowerCase().trim()}`
      }`,
      folder: `${prefix.toLowerCase().trim()}`,
      path,
      methods,
    });
  });

  return endPoints;
}
