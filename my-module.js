/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [prevStart, prevEnd] = merged[merged.length - 1];
    const [currStart, currEnd] = sorted[i];

    if (currStart <= prevEnd + threshold) {
      merged[merged.length - 1][1] = Math.max(prevEnd, currEnd);
    } else {
      merged.push([currStart, currEnd]);
    }
  }

  return merged;
};

module.exports = { mergeTimeRanges };
