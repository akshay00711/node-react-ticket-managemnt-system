function validateAdapter(adapter) {
  const requiredMethods = ["findAll", "findById", "create", "update", "delete"];
  const missingMethods = requiredMethods.filter((method) => typeof adapter[method] !== "function");

  if (missingMethods.length > 0) {
    throw new Error(`Database adapter is missing methods: ${missingMethods.join(", ")}`);
  }
}

module.exports = validateAdapter;
