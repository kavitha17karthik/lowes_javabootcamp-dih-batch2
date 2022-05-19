package ArrayAssignments;

public class NumberandSumofElements {
    public static void main(String[] args) {
        int  a[]={10,3,95,10,4,2,7,95,4,7,3,-12,4545,0,-34};
        int count=0,sum=0;

        System.out.println("Contents of the given array is ");
        for (int i=0;i<a.length;i++){
            System.out.print( a[i]+" ");
        }
        /*
       System.out.println("\nMethod 2  While loop- counter");
        for(int j:a)
        {
            System.out.print(a[j]+" ");
            count++;    //Increment the count variable
        }
        System.out.println();
        System.out.println("Number of elements in the given array is: "+ count);*/

        System.out.println("Finding the number of elements using 3 method\n");
        System.out.println("Method 1: using inbuilt length function\n");
        System.out.println("Number of elements in the given array is : " + " "+ a.length);
        System.out.println("Sum of Elements in the array");
        for(int k=0;k<a.length;k++){
            sum=sum+a[k];
        }
        System.out.println("Sum of elements in the given array is: "+" "+ sum);
    }
}
