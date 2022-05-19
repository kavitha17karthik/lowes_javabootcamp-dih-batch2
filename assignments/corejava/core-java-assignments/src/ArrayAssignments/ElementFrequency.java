package ArrayAssignments;

import java.util.Arrays;

public class ElementFrequency {
    public static void main(String[] args) {

        //declare and initialize an array
        int  a[]={10,3,95,10,4,2,7,95,3,4,10,7,3};
        int length = a.length;

        Arrays.sort(a);
        //print the sorted array
      for (int i = 0; i < a.length; i++) {
          System.out.println(a[i]);
      }
      findFrequency(a,length);
    }

    static void findFrequency(int arr[],int len){

        for(int i=0;i<len;i++)
        {
            int count=1;
            while ((i<len-1) && arr[i] == arr[i + 1]){
                i++;
                count++;
            }
            System.out.println("Number "+ arr[i] + " appears  " + count + "times");
            count++;
        }
    }
}
