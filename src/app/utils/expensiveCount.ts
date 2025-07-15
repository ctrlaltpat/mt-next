export const unlucky_dev_career_number = 499_999;
export const really_unlucky_dev_career_number = 897_071_456;

export default function expensiveCount(
  limit: number = unlucky_dev_career_number
): number {
  let count = 0;
  for (let i = 0; i < limit; i++) {
    console.log(count);
    ++count;
  }
  return count;
}
