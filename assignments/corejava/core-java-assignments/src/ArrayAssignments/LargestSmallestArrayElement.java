package ArrayAssignments;

import java.util.Arrays;

public class LargestSmallestArrayElement {
    public static void main(String[] args) {
        int a[]={10,5,-3,-198,213,87,34,9,3,87,23,8};
        int length=a.length;

        System.out.println("Array Elements are");
        for(int i=0;i<a.length-1;i++)
        {
            System.out.print(a[i]+" ");
        }
        System.out.println();
        Arrays.sort(a);
        System.out.println();
        //print the sorted array
        System.out.println("Sorted Array Elements are");
        for (int i = 0; i < a.length-1; i++) {
            System.out.print(a[i]+ " ");
        }
        System.out.println();
        largestElement(a,length);
        System.out.println();
        smallestElement(a,length);

    }

    static void largestElement(int grtArr[],int len){
     int large = grtArr[0];
     System.out.println();
     for(int i=1;i<grtArr.length;i++){
         if(large>grtArr[i]){
             continue;
         }
         else
         {
             large =grtArr[i];
         }
     }
        System.out.println("Largest Element in the Array is "+ large);
    }


    static void smallestElement(int smallArr[],int len){
        int small = smallArr[0];
        for(int i=1;i<smallArr.length;i++){
            if(small<smallArr[i]){
                continue;
            }
            else
            {
                small =smallArr[i];
            }
        }
        System.out.println("Smallest Element in the Array is "+ small);

    }
}
