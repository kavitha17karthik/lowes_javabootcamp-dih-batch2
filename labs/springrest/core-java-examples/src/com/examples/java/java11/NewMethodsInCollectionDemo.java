package com.examples.java.java11;

import java.util.Arrays;
import java.util.List;

public class NewMethodsInCollectionDemo {

	public static void main(String[] args) {
		// toArray method which takes an IntFunction argument.
		List<String> sampleList = Arrays.asList("Java", "Kotlin");
		String[] sampleArray = sampleList.toArray(String[]::new);
		System.out.println(sampleArray);
	}

}
