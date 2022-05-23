package ArrayAssignments;

import java.util.Scanner;

public class RightRotateArray {
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
        System.out.println("Enter the number of time array should be right rotated(say. 2 or 3 etc)");
        Scanner sc1=new Scanner(System.in);
        int n = sc1.nextInt();

        //Rotate the given array by n times toward right
        for(int i = 0; i < n; i++){
            int j, end;
            //Stores the Last element of the array
            end = arr[arr.length-1];
            for(j =arr.length-1; j > 0; j--){
                //Shift element of array by one
                arr[j] = arr[j-1];
            }
            //Last element of array will be added to the end
            arr[0] = end;
        }
        System.out.println();
        //Displays resulting array after rotation
        System.out.println("Array after"+ n +" right rotation is ");
        for(int i = 0; i< arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}
