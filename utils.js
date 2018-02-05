function spliceToChunks(list, chunkSize) {
  let i = 0;
  const chunks = [],
    n = list.length;

  while (i < n) {
    chunks.push(list.slice(i, i += chunkSize));
  }

  return chunks;
}

module.exports = {
  spliceToChunks,
};