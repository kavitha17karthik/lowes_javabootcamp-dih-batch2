package ArrayAssignments;

import java.util.Scanner;

public class ArrayAscending {
    public static void main(String[] args) {
        int temp;
      /*  int  a[]={10,3,95,-23,4,2,7,13,-34,3};
        System.out.println("Original Array");
        System.out.println("=======================");
        for (int i=0;i<a.length;i++){
            System.out.print(a[i]+ " ");
        }
      */
        System.out.println("Enter Array length(No of elements in a  array)");
        Scanner sc=new Scanner(System.in);
        int arrSize = sc.nextInt();
        int a[] = new int[arrSize];
        System.out.println("Enter " + " " +arrSize + "  Elements of an array");
        for (int i=0;i<arrSize;i++){
            a[i] = sc.nextInt();
        }
        System.out.println("Original Array");
        System.out.println("=======================");
        for (int i=0;i<a.length;i++){
            System.out.print(a[i]+ " ");
        }
        System.out.println();
        System.out.println("Array Sorting....");
        System.out.println();
        for (int i = 0; i < a.length; i++)
        {
            for (int j = i + 1; j < a.length; j++)
            {
                if (a[i] > a[j])
                {
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        System.out.println("Sorted Array");
        for (int k=0;k<a.length;k++){
            System.out.print(a[k]+ " ");
        }
        }
}

