package ArrayAssignments;

//Print Array element in reverse order
public class ArrayElementinReverse {
    public static void main(String[] args) {

        int a[]={1,-3,10,65,32,8,45,234};
        System.out.println("Original Array");
        System.out.println("=======================");
        for (int i=0;i<a.length;i++){
            System.out.print(a[i]+ " ");
        }
        System.out.println();
        System.out.println("\nReversed Array");
        System.out.println("=======================");
        for (int j=a.length-1;j>=0;j--){
            System.out.print(a[j] + " ");
        }
        System.out.println();
    }
}
