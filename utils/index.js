function createSlug(name) {
  return name.trim().toLowerCase().split(" ").join("-");
}

module.exports = { createSlug };
