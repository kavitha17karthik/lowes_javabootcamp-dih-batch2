package ArrayAssignments;

public class PositionArrayElement {
    public static void main(String[] args) {
        int a[]={10,5,213,87,34,9,3,87,23,8};
        //print array elements
        System.out.println("Array elements are");
        for(int i=0;i<a.length-1;i++)
        {
            System.out.print(a[i]+" ");
        }
        System.out.println();
        System.out.println("\nEven Position Elements in the Array are");
        for(int pos=0;pos<a.length-1;pos=(pos+2)){
            System.out.print(a[pos]+ " ");
        }
        System.out.println();
        System.out.println("\nOdd Position Elements in the Array are");
        for(int pos=1;pos<a.length-1;pos=pos+2){
            System.out.print(a[pos]+ " ");
        }
        System.out.println();
    }
}
