export default function median(arr: number[]) {
  const mid: number = Math.floor(arr.length / 2),
    nums: number[] = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
