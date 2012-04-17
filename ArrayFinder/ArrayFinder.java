import java.util.HashMap;

/**
 * ArrayFinder.java
 * @author: Sebastian Kim
 * @date: April 2011
 */
public class ArrayFinder {
	/**
	 * Return the starting index in the haystack parameter where the needle parameter
	 * 		if no element matched, return -1
	 * 		Total running time is O(n+m) where n - length of haystack / m - length of needle
	 */
	public int findArray(int[] haystack, int[] needle) {
		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		
		// insertion takes O(n) where n is length of haystack
		for(int i = 0; i < haystack.length; i++) {		
			if(!map.containsKey(haystack[i]))		// only interested in the starting index
				map.put(haystack[i], i);
		}
		
		// searching takes O(m) where m is length of needle
		int minIndex = -1;
		for(int n : needle) {
			Integer index = map.get(n);
			if(index == null)						// if haystack doesn't contain the element, skip
				continue;
			if(index < minIndex || minIndex == -1)	// otherwise, find the minimum index
				minIndex = index;
		}
		
		return minIndex;
	}
	
	/**
	 * Inefficient emplementation of above code
	 * 		this takes O(mn) time
	 */
	public int findArrayInefficient(int[] haystack, int[] needle) {
		for(int i = 0; i < haystack.length; i++)
			for(int n : needle)
				if(haystack[i] == n)
					return i;
		return -1;
	}
}
