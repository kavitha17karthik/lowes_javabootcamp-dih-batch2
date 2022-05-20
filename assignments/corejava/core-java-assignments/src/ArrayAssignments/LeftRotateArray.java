package ArrayAssignments;

import java.util.Scanner;

public class LeftRotateArray {

    public static void main(String[] args) {

      /*
        //Initialize array
        int arr[] = new int [] {17,34,67,23,67,10};
        //n determine the number of times an array should be rotated
        int n = 3;
        //Displays original array
        System.out.println("Original array: ");
        for (int i = 0; i < arr.length; i++) {
        System.out.print(arr[i] + " ");
        }*/
        System.out.println("Enter Array length(No of elements in a  array)");
        Scanner sc=new Scanner(System.in);
        int arrSize = sc.nextInt();
        int arr[] = new int[arrSize];
        System.out.println("Enter " + " " +arrSize + "  Elements of an array");
        for (int i=0;i<arrSize;i++){
            arr[i] = sc.nextInt();
        }
        System.out.println("Original Array");
        System.out.println("=======================");
        for (int i=0;i<arr.length;i++){
            System.out.print(arr[i]+ " ");
        }

        System.out.println();
        System.out.println("Enter the number of time array should be left rotated(say. 2 or 3 etc)");
        Scanner sc1=new Scanner(System.in);
        int n = sc1.nextInt();

        //Rotate the given array by n times toward left
        for(int i = 0; i < n; i++){
        int j, start;
        //Stores the first element of the array
        start = arr[0];
        for(j = 0; j < arr.length-1; j++){
            //Shift element of array by one
            arr[j] = arr[j+1];
        }
        //First element of array will be added to the end
        arr[j] = start;
    }
        System.out.println();
        //Displays resulting array after rotation
        System.out.println("Array after"+ n +" left rotation is ");
        for(int i = 0; i< arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}

