import java.util.Arrays;
import java.util.HashMap;

/**
 * Class Rank
 * Amazon Code Exercise: Find the sum of the most common integer.
 * Assumptions: 
 *		1. There is no invalid inputs which has the same number of common values (e.g, {1, 1, 2, 2}) or NULL
 *		2. Array size(n) is not bigger than Integer.MAX_VALUE or maximum memory
 *		3. Exception handling is omitted.
 *
 * @author: Sebastian Kim
 */

public class Rank {
	public static void main(String[] args) {
		int[] haystack = new int[]{2,4,5,6,4};
		System.out.println(sumMostCommon_Speed(haystack));
		System.out.println(sumMostCommon_Space(haystack));
		
		int[] haystack2 = new int[]{1,2,1,3,1};
		System.out.println(sumMostCommon_Speed(haystack2));
		System.out.println(sumMostCommon_Space(haystack2));
	}
	
	/**
	 * Get the sum of the most common integer in an array (optimized for runtime)
	 * Runtime: O(n) / Space: extra O(n)
	 * @param haystack
	 * @return the sum
	 */
	public static int sumMostCommon_Speed(int[] haystack) {
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		int mostCommon[] = new int[] {-1, 0};	// Highest <number, count> pair
		
		// Iterate through the array, count the occurrence using hash map
		for(int key : haystack) {
			if(map.containsKey(key)) {
				Integer value = map.get(key);
				if(++value > mostCommon[1]) {
					map.put(key, value);	// Update the hash map
					mostCommon[0] = key;	// Set current pair as the most common pair
					mostCommon[1] = value;
				}
			} else {
				map.put(key, 1);
			}
		}
		
		return mostCommon[0]*mostCommon[1];
	}
	
	/**
	 * Get the sum of the most common integer in an array (optimized for memory space)
	 * Runtime: O(n^2); average(nlogn) / Space: O(1) just extra few bytes for temporary variables
	 * @param haystack
	 * @return
	 */
	public static int sumMostCommon_Space(int[] haystack) {
		int mostCommon[] = new int[] {0, 0};	// Highest <index, count> pair
		int counter = 1;						// A buffer to compare current count  with the highest
		
		// Sort the array using Quick-Sort (In-Place, but worst case runtime: O(n^2))
		Arrays.sort(haystack);
		
		// Iterate through the array, get the most common occurrence -> O(n)
		for(int i = 1; i < haystack.length; i++) {
			if(haystack[i] == haystack[i-1]) {
				if(++counter > mostCommon[1]) {
					mostCommon[0] = i;
					mostCommon[1] = counter;
				}
			} else {
				counter = 1;	// Reset current counter
			}
		}
		
		return haystack[mostCommon[0]]*mostCommon[1];
	}
}
