/**
 * ArrayFinderTest.java
 * This program tests the ArrayFinder class using jUnit testing
 * @author: Sebastian Kim
 * @date: April 2011
 */
import junit.framework.TestCase;

public class ArrayFinderTest extends TestCase {
	/* Test normal case */
	public void testNormal() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{4,9,3,7,8};
		int[] needle = new int[]{3,7};
		int position = test.findArray(haystack, needle);
		
		assertEquals(2, position); //assert that the needle is at position 2
	}
	
	/* Test if both array are not initialized 
	 * 		- This case, default value of haystack[0] is 0 also needle[0] is 0, so iy should return 0
	 */
	public void testBothNotInitialized() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[10]; 	// default value:0
		int[] needle = new int[10]; 	// default value:0
		int position = test.findArray(haystack, needle);
		
		assertEquals(0, position);
	}
	
	/* Test if the needle is not initialized */
	public void testNeedleNotInitialized() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{1,2,3,0};
		int[] needle = new int[10]; 	// default value is 0
		int position = test.findArray(haystack, needle);
		
		assertEquals(3, position);
	}
	
	/* Test if the haystack is not initialized */
	public void testHaystackNotInitialized() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[10]; 	// default value is 0
		int[] needle = new int[]{1,2,3,0};
		int position = test.findArray(haystack, needle);
		
		assertEquals(0, position);
	}
	
	/* Test if the arrays are not initialized, and size is 0 
	 * 		In this case, even though the default initialization value is 0, the array size is 0 
	 * 		so no value will be initialized -> should return -1 
	 */
	public void testNotInitializedAndSizeZero() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[0]; 	// array length is 0 - no value initialized
		int[] needle = new int[0];		// array length is 0 - no value initialized
		int position = test.findArray(haystack, needle);
		
		assertEquals(-1, position);
	}
	
	/* Test if the needle is not initialized, and size is 0 */
	public void testNeedleNotInitializedAndSizeZero() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{1,2,3,0};
		int[] needle = new int[0]; 	// array length is 0 - no value initialized
		int position = test.findArray(haystack, needle);
		
		assertEquals(-1, position);
	}
	
	/* Test if both arrays have no value */
	public void testBothNull() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{};	// array length is 0
		int[] needle = new int[]{};		// array length is 0
		int position = test.findArray(haystack, needle);
		
		assertEquals(-1, position);
	}
	
	/* Test if the needle has no value */
	public void testNeedleNull() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{1,2,3,4};
		int[] needle = new int[]{};		// array length is 0
		int position = test.findArray(haystack, needle);
		
		assertEquals(-1, position);
	}
	
	/* Test if the haystack has no value */
	public void testHaystackNull() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{};	// array length is 0
		int[] needle = new int[]{1,2,3,4};
		int position = test.findArray(haystack, needle);
		
		assertEquals(-1, position);
	}
	
	/* Test if the array contains 0 */
	public void testContainsZero() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{1,9,0,7,8};
		int[] needle = new int[]{3,0,8};
		int position = test.findArray(haystack, needle);
		
		assertEquals(2, position);
	}
	
	/* Test if the array contains negative value */
	public void testContainsNegative() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{1,-9,0,7,-8};
		int[] needle = new int[]{-7,-3,9,-8};
		int position = test.findArray(haystack, needle);
		
		assertEquals(4, position);
	}
	
	/* Test if the needle is bigger than haystack */
	public void testNeedleIsBigger() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{-1};
		int[] needle = new int[]{-7,-3,9,-8,0,0,4,2,3,4,2,3,-1};
		int position = test.findArray(haystack, needle);
		
		assertEquals(0, position);
	}
		
	/* Test both arrays are the same */
	public void testTheSameArray() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[]{4,9,3,7,8};
		int position = test.findArray(haystack, haystack);
		
		assertEquals(0, position);
	}
	
	/* Test big arrays */
	public void testBigArray() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[32767];
		int[] needle = new int[32767];
		
		for(int i=0; i<32767; i++) {
			haystack[i] = i;		// haystack {0,1,...,32768}
			needle[i] = i+10000;		// needle {1000, 1001,...,33769}
		}
		
		int position = test.findArray(haystack, needle);
		
		assertEquals(10000, position);
	}
	
	/* Test big value */
	public void testBigValue() {
		ArrayFinder test = new ArrayFinder();
		
		int[] haystack = new int[] {-2097152, -4194304, 8388608, 2147483647, -2147483647};
		int[] needle = new int[] {32768,65536,131072, 1048576, -2147483647};
		
		int position = test.findArray(haystack, needle);
		
		assertEquals(4, position);
	}
}
