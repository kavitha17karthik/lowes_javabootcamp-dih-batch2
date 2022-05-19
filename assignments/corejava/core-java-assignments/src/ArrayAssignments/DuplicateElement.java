package ArrayAssignments;

import java.util.Arrays;

public class DuplicateElement {
    public static void main(String[] args) {
        //declare and initialize an array
        int  a[]={10,3,95,10,4,2,7,95,4,7,3};
        int length = a.length;

        Arrays.sort(a);
        //print the sorted array
        for (int i = 0; i < a.length; i++) {
            System.out.println(a[i]);
        }
        duplicateElement(a,length);
    }
    static void duplicateElement(int arr[],int len){

        for(int i=0;i<len-1;i++)
        {
            if ( arr[i] == arr[i+1]){
                System.out.println("Duplicate Element in an given array is: "+ arr[i]);
              }
        }
    }
}
