/**
 * RankTest: Unit Test
 * This program tests the Rank class using jUnit testing
 * 	- As assumptions made, tests for invalid inputs are omitted
 * @author: Sebastian Kim
 */

import static org.junit.Assert.*;
import org.junit.Test;

public class RankUnitTest {
	@Test
	public void testNormal1() {
		int[] haystack = new int[]{2,4,5,6,4};
		assertEquals(Rank.sumMostCommon_Speed(haystack), 8);
		assertEquals(Rank.sumMostCommon_Space(haystack), 8);
	}

	@Test
	public void testNormal2() {
		int[] haystack = new int[]{1,2,1,3,1};
		assertEquals(Rank.sumMostCommon_Speed(haystack), 3);
		assertEquals(Rank.sumMostCommon_Space(haystack), 3);
	}
	
	@Test
	public void testMinus() {
		int[] haystack = new int[]{-100,99,37,23,2,-100,-100,1,3,1,-100};
		assertEquals(Rank.sumMostCommon_Speed(haystack), -400);
		assertEquals(Rank.sumMostCommon_Space(haystack), -400);
	}
	
	@Test
	public void testAllSame() {
		int[] haystack = new int[]{2,2,2,2,2};
		assertEquals(Rank.sumMostCommon_Speed(haystack), 10);
		assertEquals(Rank.sumMostCommon_Space(haystack), 10);
	}
	
	@Test
	public void testAllZero() {
		int[] haystack = new int[]{0,0,0,0,0};
		assertEquals(Rank.sumMostCommon_Speed(haystack), 0);
		assertEquals(Rank.sumMostCommon_Space(haystack), 0);
	}
}
