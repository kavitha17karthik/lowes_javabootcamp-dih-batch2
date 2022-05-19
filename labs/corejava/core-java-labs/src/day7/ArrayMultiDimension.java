package day7;
import java.util.Scanner;

public class ArrayMultiDimension {
    public static void main(String[] args) {
       // int array[][]={{1,2,3},{4,5,6}};
        int array[][]=new int[2][3];
        for(int r=0;r<2;r++)
        {
            for(int c=0;c<3;c++)
            {
                System.out.println("enter values");
                Scanner sc=new Scanner(System.in);
                array[r][c]=sc.nextInt();
            }
        }
        for(int r=0;r<2;r++)
        {
            for(int c=0;c<3;c++)
            {
                System.out.print(array[r][c]+" ");

            }
            System.out.println();
        }

    }
}
