package day7;

public class ArrayGet {
    static int[] get(){return new int[]{10,4,23,64};}

    public static void main(String[] args) {
        int array[]=get();
        for(int i=0;i<array.length;i++)
        {
            System.out.println(array[i]);
        }
    }
}
